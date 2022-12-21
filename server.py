from flask import Flask, render_template, request
import calc

app = Flask(__name__)


@app.route("/")
def graph():
    return render_template("base.html")


@app.route("/crash", methods=['GET'])
def crash():
    args = request.args
    div = args.get("div")
    g = args.get("g")
    return str(calc.get_result(2**52, float(div), float(g)))


@app.route("/calc", methods=['GET'])
def cal():
    args = request.args
    m = args.get("m")
    div = args.get("div")
    g = args.get("g")
    return calc.get_CDF_EV(float(m), float(div), float(g))


if __name__ == '__main__':
    app.run()
