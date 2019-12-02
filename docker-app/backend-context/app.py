#!/usr/bin/env python3

import re
import os
import json

from pprint import pprint
from datetime import datetime

from flask import Flask
from flask import request
from flask import send_from_directory
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

DB_URI = 'mysql://rl-user:rl-specialpassword@127.0.0.1/rl-database'
#DB_URI = 'mysql://%s:%s@%s/%s' % (
#    os.environ["DB_USER"],
#    os.environ["DB_PASSWORD"],
#    os.environ["DB_SERVER"],
#    os.environ["DB_NAME"],
#)

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DB_URI

db = SQLAlchemy(app)
migrate = Migrate(app, db)

DIR_PATH = 'rl-images'


class Image(db.Model):

    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    pub_date = db.Column(db.DateTime, nullable=False, default=datetime.now)
    likes_count = db.Column(db.Integer, default=0)


@app.route('/rl-rules/upload/image', methods=['POST'])
def upload_image():
    """
    Upload a new image.
    """
    f = request.files['name']

    new_image = Image(name=f.filename)
    db.session.add(new_image)
    db.session.commit()

    f.save(os.path.join(DIR_PATH, f.filename))
    
    return json.dumps({"status": "succes"})


@app.route('/rl-rules/image/like', methods=['POST'])
def like_image():

    image_name = request.form.get('name')
        
    image = Image.query.filter_by(name=image_name).first()
    image.likes_count += 1
    db.session.commit()

    return json.dumps({"status": "succes"})


@app.route('/rl-rules/image/likes', methods=['GET'])
def get_image_likes():

    image_name = request.args.get('name')
    image = Image.query.filter_by(name=image_name).first()

    return json.dumps(image.likes_count)


@app.route('/rl-rules/image', methods=['GET'])
def get_image():

    image_name = request.args.get('name')

    try:
        return send_from_directory(DIR_PATH, filename=image_name)
    except FileNotFoundError:
        abort(404)


@app.route('/rl-rules/images', methods=['GET'])
def get_images_list():
    """
    Return the list of images.
    """

    return json.dumps([
        {
            "name": image.name,
            "likesCount": image.likes_count,
            "publicationDate": str(image.pub_date),
        }
        for image in 
        Image.query.order_by(Image.pub_date.desc())
    ])


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
