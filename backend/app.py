import pandas as pd
import chromadb
from flask import Flask , jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def dataFrame(prompt, year):
    df=pd.read_csv('./data/the_oscar_award.csv')
    df=df.loc[df['year_ceremony'] <= int(year)]
    df=df.loc[df['year_ceremony'] >= int(year)-3]      
    df=df.dropna()
    df.loc[:, 'category'] = df['category'].str.lower()
    df.loc[:, 'text'] = df['name'] + ' got nominated under the category, ' + df['category'] + ', for the film ' + df['film'] +' ('+ df['year_film'].apply(str) +')' + ' to win the award' + " at OSCARS "+'('+ df['year_ceremony'].apply(str) +').       ' +"              "
    df.loc[df['winner'] == False, 'text'] = df['name'] + ' got nominated under the category, ' + df['category'] + ', for the film ' + df['film'] +' ('+ df['year_film'].apply(str) +')' + ' but did not win' + " at OSCARS "+'('+ df['year_ceremony'].apply(str) +')      ' + "          " 
        
    client =chromadb.Client() 
    collection = client.get_or_create_collection("oscars-2023")
    docs =df["text"].tolist()
    ids= [str(x) for x in df.index.tolist()] 
    collection.add(
        documents=docs,
        ids=ids
    )

    results = collection.query(
        query_texts=[prompt],
        n_results=20,
    )
    print(results)
    return results['documents']


# Defining the behavior of the endpoint "/api/run_foo"
@app.route("/api/run_foo")
def this_function_name_doesnt_really_matter():
    foo_param = request.args.get("param_prompt", type=str)
    year = request.args.get("param_year", type=str)
    if foo_param =="" and year=="":
        result={'error':'Please provide a prompt or a year'}
        return jsonify(result)
    else:
        print(request.args)
        data = {"result": dataFrame(foo_param, year)}
        return jsonify(data)

if __name__ == "__main__":
    app.run()
