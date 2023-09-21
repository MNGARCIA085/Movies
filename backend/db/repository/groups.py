from sqlalchemy import and_
from sqlalchemy.orm import Session
from db.models.groups import Groups
from schemas.groups import GroupCreate,FilterGroups

def create_new_group(group:GroupCreate, db: Session):
    group = Groups(**group.dict())
    db.add(group)
    db.commit()
    db.refresh(group)
    return group



def get_groups(db: Session, f:FilterGroups):
    filters = [Groups.id>0]
    if f.description:
        filters.append(Groups.description==f.description)
    if f.description__contains:
        filters.append(Groups.description.contains(f.description__contains))
    # junto todo
    filters = and_(*filters)
    # query
    query = db.query(Groups).filter(filters).limit(f.limit).offset(f.offset).all()
    # count
    count = db.query(Groups).filter(filters).count()
    # data
    data = [
        {
            'id':d.id,
            'description': d.description,
        }
        for d in query
    ]
    #
    response = {
        'data': data,
        'count': count,
        'limit':f.limit,
        'offset':f.offset
    }
    return response


# get genre by id
def retreive_group(id: int, db: Session):
    return db.query(Groups).filter(Groups.id == id).first()



# update genre
def update_group_by_id(id: int, group:GroupCreate, db: Session):
    existing_group = db.query(Groups).filter(Groups.id == id)
    if not existing_group.first():
        return 0
    # actualizo la peli y sus géneros
    data = group.dict(exclude_unset=True) # ipte
    # update
    existing_group.update(data) 
    db.commit()
    return 1




# delete genre
def delete_group_by_id(id: int, db: Session):
    existing_genre = db.query(Groups).filter(Groups.id == id)
    if not existing_genre.first():
        return 0
    # borro la peli
    existing_genre.delete(synchronize_session=False) # ver esto
    db.commit()
    return 1
    