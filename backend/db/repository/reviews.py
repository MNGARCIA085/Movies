from db.models.reviews import Review
from schemas.reviews import ReviewCreate,FilterReview
from sqlalchemy.orm import Session
from db.models.movies import Movie 
from db.models.users import User
from sqlalchemy import or_,and_


def create_new_review(review: ReviewCreate, db: Session, user_id: int):
    review_object = Review(**review.dict(),user_id=user_id)
    db.add(review_object)
    db.commit()
    db.refresh(review_object)
    return review_object






def list_reviews(db: Session,score,f:FilterReview):#,movie_id,movie_title,movie_title__contains
    
    filters = [Review.id>0]

    if score:
        score_filter = []
        for s in score:
            score_filter.append(Review.score == s)
        combined_filter_scores = or_(*score_filter)
        filters.append(combined_filter_scores)

    if f.movie_id:
        movie_id_filter = (Movie.id==int(f.movie_id))
        filters.append(movie_id_filter)


    if f.movie_title:
        filters.append(Movie.title==f.movie_title)


    if f.movie_title__contains:
        filters.append(Movie.title.contains(f.movie_title__contains))


    if f.user_id:
        filters.append(Review.user_id==f.user_id)

    # junto todo
    filters = and_(*filters)


    return db.query(Review).join(Movie).join(User).filter(filters).all()










"""
consultas exitosas
#db.query(Review).join(Movie).all(), from db.models.movies import Movie
#return db.query(Review).filter(Review.score=='5').all(); query ok
#return db.query(Review).join(Movie).filter(Review.score==5).all() #ok
#return db.query(Review).join(Movie).filter(or_(Review.score==5,Review.score==0)).all()
# ok return db.query(Review).join(Movie).filter(combined_filter_scores,Movie.title=='peli1').all()
# ok filters = and_(combined_filter_scores,Movie.id==movie_id)
#filters = and_(combined_filter_scores,movie_id_filter)
"""








"""
def retreive_job(id: int, db: Session):
    item = db.query(Job).filter(Job.id == id).first()
    return item


def list_jobs(db: Session):
    jobs = db.query(Job).all()
    return jobs


def update_job_by_id(id: int, job: JobCreate, db: Session, owner_id):
    existing_job = db.query(Job).filter(Job.id == id)
    if not existing_job.first():
        return 0
    job.__dict__.update(
        owner_id=owner_id
    )  # update dictionary with new key value of owner_id
    existing_job.update(job.__dict__)
    db.commit()
    return 1


def delete_job_by_id(id: int, db: Session, owner_id):
    existing_job = db.query(Job).filter(Job.id == id)
    if not existing_job.first():
        return 0
    existing_job.delete(synchronize_session=False)
    db.commit()
    return 1


def search_job(query: str, db: Session):
    jobs = db.query(Job).filter(Job.title.contains(query))
    return jobs
"""
