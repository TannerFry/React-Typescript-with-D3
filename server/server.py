import bottle
import os
import platform

app = bottle.Bottle()


@app.route('/<filepath:path>')
def server_static(filepath):
    return bottle.static_file(filepath, "../client")


@app.route("/")
def home():
    return bottle.static_file("index.html", "../client")


if __name__ == "__main__":
    src_directory = os.path.abspath(os.path.dirname(__file__))
    os.chdir(src_directory)

    hostname = "localhost"
    system = platform.system()
    if system != "Windows":
        hostname = "0.0.0.0"

    app.run(host=hostname, port=5000)
