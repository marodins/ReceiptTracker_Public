import React from 'react'
import {Table,Input,Button} from 'semantic-ui-react'
import axios from 'axios'
import current_user from '../../auth/login_auth'


class LoadData extends React.Component{
    //data.data.items[0] ... [1]...
    constructor(props){
        super(props);
        this.valueChange = this.valueChange.bind(this)
        this.onChangeCell = this.onChangeCell.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.saveReceipt = this.saveReceipt.bind(this)
        this.handleEnter = this.handleEnter.bind(this)
        this.state = {
            cell:{
                row:'',
                name:''
            },
            loading:false
        }
        this.user_id = current_user.user_id
    }
    onChangeCell = (e) =>{
        //get id of clicked cell
        const rowId = e.target.closest('tr').getAttribute('id')
        const cellId = e.target.getAttribute('id')
        if(cellId == null){
            return false
        }
        this.setState(prevState=>({
            ...prevState,
            cell:{
                row:rowId,
                name:cellId,
            }
        }))

    }
    onDelete = (e) =>{
        var row_id= e.target.closest('tr').id
        var {items} = {...this.props.data}
        delete items[row_id]
        this.props.handleData({items})
    }

    saveReceipt = () =>{
        this.setState({loading:true});
        //make axios req
        var all_data = this.props.data
        var headers = {
            withCredentials:true
        }
        axios.post(`/users/${this.user_id}/receipts`,all_data,headers)
        .then(res=>{

            this.setState({loading:false},()=>{
                //no error--false
                this.props.setComplete(false)
            })
            //this.props.history.push('/upload')
        })
        .catch(error=>{
            console.log(error)
            this.props.setComplete(true)
        })

    }

    handleEnter = (e) =>{
        if(e.code === 'Enter'){
            this.setState({cell:{row:'',name:''}})
        }
    }
    otherChange = (e) =>{
        var current = e.target.value
        var id = e.target.id
        var {store,date} = {...this.props.data}
        if(id ==='store'){
            store = current
        }else{
            date = current
        }
        
        this.props.handleData({store,date})
    }

    valueChange = (e) =>{

        var current = e.target.defaultValue
        var id = e.target.id
        var key = e.target.closest('tr').id
        var {items} = {...this.props.data}

        for(var item in items){

            if(items[item].item_name === current && id === 'item' && key == item){
                items[item].item_name = e.target.value
            }
            if(items[item].price === current && id ==='price' && key == item){
                items[item].price = e.target.value
            }
        }
        this.props.handleData({items})
    }
    render(){
        if(this.props.data==null){
            return(<div></div>)
        }
        const date = this.props.data.date
        const store = this.props.data.store
        const items_obj = this.props.data.items;
        return(
            <div>
                <Button floated ='right' color='green'onClick={this.saveReceipt} basic loading = {this.state.loading}>Save Receipt</Button>
                <Table onKeyDown = {this.handleEnter}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>Store</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                        <Table.Row onClick = {this.onChangeCell} id = 'initial'>
                        {this.state.cell.name == 'date'?
                                        <Table.Cell><Input defaultValue = {date} id = "date" onChange = {this.otherChange}></Input></Table.Cell>:
                                        <Table.Cell value = {date} id ="date">{date}</Table.Cell>}
                        {this.state.cell.name == 'store'?
                                        <Table.Cell><Input defaultValue = {store} id = "store" onChange = {this.otherChange}></Input></Table.Cell>:
                                        <Table.Cell value = {store} id ="store">{store}</Table.Cell>}
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell>Item</Table.HeaderCell>
                            <Table.HeaderCell>Price</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {Object.keys(items_obj).map((d_key)=>{
                            var item = items_obj[d_key].item_name
                            var price = items_obj[d_key].price
                            return(
                                <Table.Row onClick = {this.onChangeCell} key= {d_key} id = {d_key}>
                                    {this.state.cell.row==d_key && this.state.cell.name == 'item'?
                                        <Table.Cell><Input defaultValue = {item} id = "item" onChange = {this.valueChange}></Input></Table.Cell>:
                                        <Table.Cell value = {item} name = {item} id ="item">{item}</Table.Cell>}
                                    {this.state.cell.row==d_key && this.state.cell.name == 'price'?<Table.Cell><Input defaultValue = {price} id = "price" onChange = {this.valueChange}></Input></Table.Cell>:<Table.Cell value = {price} name = {price} id = "price">{price}</Table.Cell>}
                                    <Table.Cell><Button floated ='right' color ='red' onClick = {this.onDelete}>Delete Item</Button></Table.Cell>
                                </Table.Row>
                            )})
                        }
                    </Table.Body>
                </Table>
            </div>
        )    


    }
}



export default LoadData;