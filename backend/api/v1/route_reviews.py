from typing import List
from api.v1.route_login import get_current_user_from_token
#from apis.version1.route_login import get_current_user_from_token
from db.models.users import User
from db.repository.reviews import create_new_review,list_reviews
from db.session import get_db
from fastapi import APIRouter, Depends,HTTPException,status
from schemas.reviews import ReviewCreate,ShowReview,FilterReview
from sqlalchemy.orm import Session
from db.models.reviews import Review




router = APIRouter()



@router.post("/",response_model=ShowReview,status_code=201)
def create_review(
    review: ReviewCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user_from_token),
):
    # sólo puedo tener una review por usuario
    if db.query(Review).filter_by(user_id=current_user.id).first():
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, 
                            detail="Only one review can be done")
    # respuesta
    return create_new_review(review=review, user_id=current_user.id, db=db)   #owner_id=current_user.id



@router.get("/",response_model=List[ShowReview])
def read_reviews(
        f: FilterReview = Depends(),
        #score: list = Query(default=None),
        db: Session = Depends(get_db),
                    
                 ):
    return list_reviews( db=db ,f=f )

