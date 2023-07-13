"""Initial migration

Revision ID: 830becff73ad
Revises: fa5b054ab351
Create Date: 2023-07-12 19:33:12.996351

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '830becff73ad'
down_revision = 'fa5b054ab351'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('movie', 'imagen')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('movie', sa.Column('imagen', sa.BLOB(), nullable=True))
    # ### end Alembic commands ###
