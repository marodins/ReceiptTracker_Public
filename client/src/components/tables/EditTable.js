import axios from 'axios'
import React from 'react'
import {Table,Button,Input, Container,Dimmer,Loader} from 'semantic-ui-react'




class EditTable extends React.Component{
    constructor(props){
        super(props)
        this.state={
            items:this.props.data.items,
            store:this.props.data.store,
            date:this.props.data.receipt_date,
            key:'',
            clicked_id:'',
            dimmer:false,
            loader:false
        }
    }
    cellClicked = (e)=>{
        var id = e.target.closest('tr').id
        var name = e.target.id

        console.log('in the click',id + name)

        this.setState({key:id,clicked_id:name})
    }

    inputChange = (e)=>{
        var val = e.target.value
        var key = this.state.key
        var cell_id = e.target.id
        this.setState((prevState)=>{
            
            if(cell_id ==="store"){
                prevState.store = val
            }else if(cell_id==="date"){
                prevState.date = val
            }else{
                prevState.items[key][cell_id] = val
            }
            
            return prevState
        }) 


    }

    handleEnter = (e) =>{
        if(e.code ==='Enter'){
            this.setState({clicked_id:''})
        }
        
    }
    handleItemDelete = (e) =>{
        var id = e.target.closest('tr').id
        this.setState(prevState=>{
            delete prevState.items[id]
            return prevState
        })
    }
    submitChange = () =>{
        this.setState({dimmer:true,loader:true})
        var store = this.state.store
        var date = this.state.date
        var receipt_id = this.props.data.receipt_id
        var items = Object.keys(this.state.items).map((key)=>{
            var all_items = this.state.items
            return [all_items[key].item_name,all_items[key].item_price,this.props.data.receipt_id]
        })
        axios.put('/receipts/update',{store,date,items,receipt_id},{withCredentials:true})
            .then(res=>{
                return this.setState({dimmer:false,loader:false},()=>{
                    this.props.setMessage('success')
                    this.props.operateModal()
                })
            })
            .catch(err=>{
                return this.setState({dimmer:false,loader:false},()=>{
                    this.props.setMessage('error')
                })
            })
    }

    render(){
        var clicked_cell =this.state.key+this.state.clicked_id 
        console.log(clicked_cell,'clicked cell')
        return(
            <Container>
                <Dimmer active = {this.state.dimmer}>
                    <Loader active={this.state.loader}/>
                </Dimmer>  
                    <Table onKeyDown = {this.handleEnter} attached='top'>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>
                                    Store
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Date
                                </Table.HeaderCell>                          
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            <Table.Row id ="header">
                                <Table.Cell id = "store" onClick={this.cellClicked}>
                                    {this.state.clicked_id === 'store'?<Input id ="store" defaultValue={this.state.store} onChange={this.inputChange}></Input>:this.state.store}
                                </Table.Cell>
                                <Table.Cell id = "date" onClick = {this.cellClicked}>
                                    {this.state.clicked_id === 'date'?<Input id ="date" defaultValue ={this.state.date} onChange={this.inputChange}/>:this.state.date}
                                </Table.Cell>
                            </Table.Row>                           
                        </Table.Body>
                    </Table>
                    <Table onKeyDown = {this.handleEnter} attached='bottom'>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>
                                    Item
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Price
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {Object.keys(this.state.items).map((key)=>{
                                var item_name = this.state.items[key].item_name
                                var price = this.state.items[key].item_price
                                return(
                                    <Table.Row id = {key} key = {key} >
                                        {clicked_cell === (key+"item_name")?<Input id = "item_name" onChange = {this.inputChange} defaultValue = {item_name}></Input>:<Table.Cell id = "item_name" onClick ={this.cellClicked}>{item_name}</Table.Cell>}
                                        {clicked_cell === (key+"item_price")?<Input id = "item_price" onChange ={this.inputChange} defaultValue = {price}></Input>:<Table.Cell id = "item_price" onClick ={this.cellClicked}>{price}</Table.Cell>}
                                        <Table.Cell><Button size ="small" onClick = {this.handleItemDelete} color = "red">Delete Item</Button></Table.Cell>
                                    </Table.Row>
                                )
                            })}                            
                        </Table.Body>

                    </Table>
                    <Button floated = "right" onClick = {this.submitChange} color = "green">Submit Changes</Button>
            </Container> 
        )
    }
}

export default EditTable