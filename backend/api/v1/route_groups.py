from db.repository.groups import create_new_group, get_groups,FilterGroups,retreive_group,update_group_by_id,delete_group_by_id
from db.session import get_db
from fastapi import APIRouter, Depends, HTTPException, status
from schemas.groups import GroupCreate,ShowGroup
from sqlalchemy.orm import Session


router = APIRouter()


@router.post("/", status_code=201)
def create_group(group:GroupCreate, db: Session = Depends(get_db)):
    return create_new_group(group=group, db=db)


# GET
@router.get("/")
def get_all_genres(f:FilterGroups=Depends(),db: Session = Depends(get_db)):
    return get_groups(db=db,f=f)



# GENRE BY ID
@router.get(
    "/{id}",response_model=ShowGroup
)
def read_group(id: int, db: Session = Depends(get_db)):
    group = retreive_group(id=id, db=db)
    if not group:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Genre with this id {id} does not exist",
        )
    return group


# UPDATE
@router.put("/{id}",status_code=201)
def update_genre(
                id: int, 
                group: GroupCreate, 
                db: Session = Depends(get_db)):
    aux = update_group_by_id(id=id, group=group, db=db)
    if not aux:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Genre with id {id} not found"
        )
    return {"msg": "Successfully updated data."}



# DELETE
@router.delete("/{id}")
def delete_genre(
    id: int,
    db: Session = Depends(get_db)
):
    genre = retreive_group(id=id, db=db)
    if not genre:
        return HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Genre with id {id} does not exist",
        )
    # chequear que sólo pueda borrar un superusuario
    delete_group_by_id(id=id, db=db)
    return {"detail": "Successfully deleted."}
