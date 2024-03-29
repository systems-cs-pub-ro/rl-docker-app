
import os
from random import randint

from run import Image
from run import db

filenames = os.listdir('./rl-images/predefined/')

for filename in filenames:

    image = Image.query.filter_by(name=filename).first()
    if image:
        continue

    no_of_likes = randint(0, 20)

    image = Image(name=filename, likes_count=no_of_likes)

    db.session.add(image)
    db.session.commit()
