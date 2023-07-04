from typing import List
from db.models.movie_genre import MovieGenre
from sqlalchemy.orm import Session



def create_movie_genres(movie_id:int,genres:List[int],db:Session):
    for g in genres:
        movie_genre_object = MovieGenre(movie_id=movie_id,genre_id=g)
        db.add(movie_genre_object)
        # sin commit pues es más bien un accesorio
    return 





# borro todos los géneros de la peli
def delete_movie_genres(movie_id:int,db:Session):
    db.query(MovieGenre).filter(MovieGenre.movie_id==movie_id).delete(synchronize_session=False)
    return
