import React from 'react'
import {Table, Card,Button, Modal,Container} from 'semantic-ui-react'
import ReceiptCard from './ReceiptCard'
import axios from 'axios'
import EditTable from './EditTable'


class LoadReceipts extends React.Component{
    constructor(props){
        super(props)
        this.handleDelete = this.handleDelete.bind(this)
        this.operateModal = this.operateModal.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.state = {
            data:this.props.data,
            deleteLoading:false,
            showModal:false,
            edit_table:false
        }
    }

    componentDidMount(){
        if(this.props.modalOn === this.state.data.receipt_id){
            this.setState({showModal:true})
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.modalOn !== prevProps.modalOn){
            if(this.props.modalOn === this.state.data.receipt_id){
               return this.setState({showModal:true}) 
            }
        }
    }

    handleDelete = (e) =>{
        
        var id = {params:{receipt_id:this.state.data.receipt_id}}

        this.setState({deleteLoading:true})

        var header = {
            withCredentials:true
        }
        axios.delete('/receipts/delete',id,header)
        .then(res=>{
            this.setState({deleteLoading:false})
            return this.props.getAll()
        })
        .catch(err=>console.log(err))
    }

    operateModal = () =>{
        this.setState((prevState)=>{
            return {
                ...prevState,
                showModal:prevState.showModal?false:true,
                }
        },()=>{
            if(this.state.showModal === true){
                if(this.props.modalOn === this.state.data.receipt_id){
                    this.props.clearModal('')
                }
            }
        })
        
    }

    handleEdit = () =>{
        this.setState({edit_table:true})
    }
    render(){
        var store = this.props.data.store
        var date = this.props.data.receipt_date
        return(
                <div>
                    <ReceiptCard
                        store = {store}
                        date = {date}
                        handleDelete = {this.handleDelete}
                        handleEdit = {this.handleEdit}
                        operateModal = {this.operateModal}
                        loading = {this.state.deleteLoading}/>

                    <Modal
                        onClose = {()=>{
                            this.setState({edit_table:false})
                        }}
                        open = {this.state.edit_table}>
                        <EditTable
                            data = {this.props.data}
                            setMessage = {this.props.setMessage}
                            operateModal = {()=>
                            (this.setState({edit_table:false}))}
                            getAll = {this.props.getAll}
                            />
                            
                    </Modal>

                                     
                    <Modal
                        onClose = {this.operateModal}
                        onOpen = {this.operateModal}
                        open = {this.state.showModal}
                        >
                        <Container>
                            <Table fixed basic>
                                <Table.Header>
                                    <Table.Row>
                                            <Table.HeaderCell>
                                                Item
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                Price
                                            </Table.HeaderCell>                          
                                    </Table.Row>                                    
                                </Table.Header>

                                <Table.Body>
                                    {Object.keys(this.props.data.items).map((key)=>{
                                        return(
                                            <Table.Row id = "item" key = {key}>
                                                <Table.Cell id = "item_name">{this.props.data.items[key].item_name}</Table.Cell>
                                                <Table.Cell id = "price" >{this.props.data.items[key].item_price}</Table.Cell>
                                            </Table.Row>
                                        )
                                    })}                                    
                                </Table.Body>

                            </Table>
                        </Container>                   
                    </Modal>                   
                </div>
                


        )
    }
}


export default LoadReceipts