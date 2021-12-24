import React from 'react'
import {Card,Button,Segment} from 'semantic-ui-react'


var ReceiptCard = ({store,date,handleDelete,operateModal,loading,handleEdit}) =>(
    <Segment basic>
        <Card>
            <Card.Content>
                <Card.Header>{store}</Card.Header>
                <Card.Meta>{date}</Card.Meta>                            
            </Card.Content>
            <Card.Content extra>
                <div class = "ui three buttons">
                    <Button id = "view" onClick = {operateModal} color = "green">
                        View
                    </Button>
                    <Button id = "edit" color = "black" onClick={handleEdit}>
                        Edit
                    </Button>                
                    <Button id = "delete" onClick={handleDelete} color = "red" loading={loading}>
                        Delete
                    </Button>

                </div>
            </Card.Content>
        </Card>
    </Segment>
)
export default ReceiptCard