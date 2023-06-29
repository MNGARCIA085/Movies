from db.models.reviews import Review
from schemas.reviews import ReviewCreate
from sqlalchemy.orm import Session


def create_new_review(review: ReviewCreate, db: Session, user_id: int):
    review_object = Review(**review.dict(),user_id=user_id)
    db.add(review_object)
    db.commit()
    db.refresh(review_object)
    return review_object




from db.models.movies import Movie 

def list_reviews(db: Session):
    #db.query(Review).join(Movie).all(), from db.models.movies import Movie
    return db.query(Review).join(Movie).all()






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
