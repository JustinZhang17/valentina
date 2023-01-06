from flask import Flask, render_template, request
import calc

app = Flask(__name__, template_folder='./templates',
            static_folder='./static')


@app.route("/")
def graph():
    """Index/base

    Returns:
        html file: client side primary screen
    """
    return render_template("base.html")


@app.route("/crash", methods=['GET'])
def crash():
    """End point at /crash get request

    Returns:
        string: crash multiplier/factor 
    """
    args = request.args
    div = args.get("div")
    g = args.get("g")
    return str(calc.get_result(2**52, float(div), float(g)))


@app.route("/calc", methods=['GET'])
def cal():
    """End point at /calc get request

    Returns:
        dictionary: returns calculation from the get_CDF_EV function in calc.py
    """
    args = request.args
    m = args.get("m")
    div = args.get("div")
    g = args.get("g")
    return calc.get_CDF_EV(float(m), float(div), float(g))


if __name__ == '__main__':
    app.run()
