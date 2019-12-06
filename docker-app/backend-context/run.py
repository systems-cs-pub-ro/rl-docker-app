#!/usr/bin/env python3

import re
import os
import json

from pprint import pprint
from datetime import datetime

from flask import Flask
from flask import request
from flask import jsonify
from flask import send_from_directory
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy


if os.environ.get('IN_CONTAINER'):

    DB_URI = 'mysql://%s:%s@%s/%s' % (
        os.environ["DB_USER"],
        os.environ["DB_PASSWORD"],
        os.environ["DB_SERVER"],
        os.environ["DB_NAME"],
    )

else:
    DB_URI = 'mysql://rl-user:rl-specialpassword@127.0.0.1/rl-database'


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DB_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

IMAGES_PATH = 'rl-images'

UPLOADED_IMAGES_PATH = IMAGES_PATH + '/upload'
PREDEFINED_IMAGES_PATH = IMAGES_PATH + '/predefined'


class Image(db.Model):

    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    pub_date = db.Column(db.DateTime, nullable=False, default=datetime.now)
    likes_count = db.Column(db.Integer, default=0)


@app.route('/api/upload/image', methods=['POST'])
def upload_image():
    """
    Upload a new image.
    """
    f = request.files['name']

    new_image = Image(name=f.filename)
    db.session.add(new_image)
    db.session.commit()

    f.save(os.path.join(UPLOADED_IMAGES_PATH, f.filename))
    
    return json.dumps({"status": "succes"})


@app.route('/api/image/like', methods=['POST'])
def like_image():

    try:
        image_id = request.json.get('id')
            
        image = Image.query.filter_by(id=image_id).first()
        image.likes_count += 1
        db.session.commit()

    except Exception:
        return json.dumps({"status": "error"})

    return json.dumps({"status": "succes"})


@app.route('/api/image/likes', methods=['GET'])
def get_image_likes():

    image_id = request.args.get('id')
    image = Image.query.filter_by(id=image_id).first()

    return jsonify(image.likes_count)


@app.route('/api/image', methods=['GET'])
def get_image():

    image_id = request.args.get('id')

    image = Image.query.filter_by(id=image_id).first()
    image_name = image.name

    try:
        if os.path.exists(PREDEFINED_IMAGES_PATH + '/' + image.name):
            return send_from_directory(PREDEFINED_IMAGES_PATH, filename=image_name)
        else:
            return send_from_directory(UPLOADED_IMAGES_PATH, filename=image_name)

    except FileNotFoundError:
        abort(404)


@app.route('/api/images', methods=['GET'])
def get_images_list():
    """
    Return the list of images.
    """

    return jsonify([
        {
            "id": image.id,
            "name": image.name,
            "likesCount": image.likes_count,
            "publicationDate": str(image.pub_date),
        }
        for image in 
        Image.query.order_by(Image.pub_date.desc())
        if image.name and (
            os.path.exists(PREDEFINED_IMAGES_PATH + '/' + image.name) or 
            os.path.exists(UPLOADED_IMAGES_PATH + '/' + image.name)
        )
    ])


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
