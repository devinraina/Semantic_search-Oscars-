import pandas as pd
import chromadb
from flask import Flask , jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def foo(param):
    return f"From python. Received: {param}. Its double is: {param * 2}"


# Defining the behavior of the endpoint "/api/run_foo"
@app.route("/api/run_foo")
def this_function_name_doesnt_really_matter():
    foo_param = request.args.get("param_to_foo", type=int)

    data = {"result": foo(foo_param)}
    return jsonify(data)

if __name__ == "__main__":
    app.run()
