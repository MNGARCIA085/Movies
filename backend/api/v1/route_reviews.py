from typing import List, Optional


#from apis.version1.route_login import get_current_user_from_token
from db.models.users import User
from db.repository.reviews import create_new_review,list_reviews
from db.session import get_db
from fastapi import APIRouter, Query
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status
from schemas.reviews import ReviewCreate,ShowReview,FilterReview
from sqlalchemy.orm import Session


router = APIRouter()



@router.post("/",response_model=ShowReview,status_code=201)
def create_review(
    review: ReviewCreate,
    db: Session = Depends(get_db),
    #current_user: User = Depends(get_current_user_from_token),
):
    return create_new_review(review=review, db=db, user_id=1)   #owner_id=current_user.id



@router.get("/",response_model=List[ShowReview]) #,response_model=List[ShowReview]
def read_reviews(
        f: FilterReview = Depends(),
        score: list = Query(default=None),
        db: Session = Depends(get_db),
                    
                 ):
    #print(f.movie_id)
    print(f.problematic)
    return list_reviews(db=db,
                            score=score,
                            f=f,
                        )




"""
movie_id=f.movie_id,
movie_title=f.movie_title,
movie_title__contains=f.movie_title__contains,
"""




"""
@router.get("/",response_model=List[ShowReview]) #,response_model=List[ShowReview]
def read_reviews(
    db: Session = Depends(get_db),
                    score: list = Query(default=None),
                    movie_id:int | None = None,
                    movie_title:str | None = None,
                    movie_title__contains:str | None = None,
                 ):
    return list_reviews(db=db,
                            score=score,
                            movie_id=movie_id,
                            movie_title=movie_title,
                            movie_title__contains=movie_title__contains,
                        )
"""








"""

@router.get(
    "/get/{id}", response_model=ShowJob
)  # if we keep just "{id}" . it would stat catching all routes
def read_job(id: int, db: Session = Depends(get_db)):
    job = retreive_job(id=id, db=db)
    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Job with this id {id} does not exist",
        )
    return job


@router.get("/all", response_model=List[ShowJob])
def read_jobs(db: Session = Depends(get_db)):
    jobs = list_jobs(db=db)
    return jobs


@router.put("/update/{id}")
def update_job(id: int, job: JobCreate, db: Session = Depends(get_db)):
    current_user = 1
    message = update_job_by_id(id=id, job=job, db=db, owner_id=current_user)
    if not message:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Job with id {id} not found"
        )
    return {"msg": "Successfully updated data."}


@router.delete("/delete/{id}")
def delete_job(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user_from_token),
):
    job = retreive_job(id=id, db=db)
    if not job:
        return HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Job with id {id} does not exist",
        )
    print(job.owner_id, current_user.id, current_user.is_superuser)
    if job.owner_id == current_user.id or current_user.is_superuser:
        delete_job_by_id(id=id, db=db, owner_id=current_user.id)
        return {"detail": "Successfully deleted."}
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED, detail="You are not permitted!!!!"
    )


@router.get("/autocomplete")
def autocomplete(term: Optional[str] = None, db: Session = Depends(get_db)):
    jobs = search_job(term, db=db)
    job_titles = []
    for job in jobs:
        job_titles.append(job.title)
    return job_titles

    """