(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{203:function(e,t,a){},204:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),c=a(69),i=a.n(c),r=a(11),l=a(12),o=a(9),d=a(14),h=a(13),j=a(18),u=a(31),b=a(20),O=a.n(b),p=a(230),m=a(1),x=function(){return Object(m.jsx)(p.a,{negative:!0,header:"Whoops! This email is taken.",content:"Use another email."})},f=function(){return Object(m.jsx)(p.a,{negative:!0,header:"Unable to delete account, something went wrong please try again."})},g=function(){return Object(m.jsx)(p.a,{negative:!0,header:"Unable to change email, something went wrong, please try again."})},C=function(){return Object(m.jsx)(p.a,{negative:!0,header:"Unable to change password, something went wrong, please try again."})},v=function(){return Object(m.jsx)(p.a,{negative:!0,header:"Incorrect email or password.",content:"Try, again."})},w=function(){return Object(m.jsx)(p.a,{negative:!0,header:"New password and confirm password don't match",content:"Try again"})},k=function(){return Object(m.jsx)(p.a,{negative:!0,header:"Old password is incorrect",content:"Try again"})},S=function(){return Object(m.jsx)(p.a,{negative:!0,header:"Emails don't match",content:"Try again"})},y=function(){return Object(m.jsx)(p.a,{negative:!0,header:"Email already exists",content:"try different email"})},E=function(){return Object(m.jsx)(p.a,{negative:!0,header:"something went wrong with the update, please try again"})},D=new(function(){function e(){Object(r.a)(this,e),this.authenticated=!1,this.user=null,this.token=null}return Object(l.a)(e,[{key:"login",value:function(e,t,a){this.authenticated=!0,this.token=t,this.user=e,a()}},{key:"logout",value:function(e){var t=this;this.authenticated=!1,O.a.post("/logout",this.user,{withCredentials:!0}).then((function(a){t.user=null,t.token=null,e()})).catch((function(e){return e}))}},{key:"isAuth",value:function(){return this.authenticated}},{key:"getUser",value:function(){return this.user}},{key:"setToken",value:function(e){this.token=e}},{key:"setUser",value:function(e){this.user=e}}]),e}()),_=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).onChangeEmail=function(e){n.setState({email:e.target.value})},n.onChangePassword=function(e){n.setState({password:e.target.value})},n.getSubmit=function(e){e.preventDefault();var t={email:n.state.email,password:n.state.password};O.a.post("http://localhost:3131/login",t,{withCredentials:!0}).then((function(e){"mismatch"===e.data.authentication||"no-match"===e.data.authentication?n.setState({loggedIn:!1}):D.login(e.data.user,e.data.token,(function(){n.props.history.push("/upload")}))})).catch((function(e){n.props.history.push("/")}))},n.onChangeEmail=n.onChangeEmail.bind(Object(o.a)(n)),n.onChangePassword=n.onChangePassword.bind(Object(o.a)(n)),n.getSubmit=n.getSubmit.bind(Object(o.a)(n)),n.state={email:"",password:"",loggedIn:null},n}return Object(l.a)(a,[{key:"render",value:function(){return Object(m.jsxs)("div",{children:[!1===this.state.loggedIn?Object(m.jsx)(v,{}):null,Object(m.jsx)("form",{class:"ui large form",onSubmit:this.getSubmit,children:Object(m.jsxs)("div",{class:"ui stacked segment",children:[Object(m.jsxs)("div",{class:"field",children:[Object(m.jsx)("label",{children:"Email"}),Object(m.jsx)("input",{onChange:this.onChangeEmail,value:this.state.email,type:"email",id:"email",name:"email"})]}),Object(m.jsxs)("div",{class:"field",children:[Object(m.jsx)("label",{children:"Password"}),Object(m.jsx)("input",{type:"password",id:"password",name:"password",value:this.state.password,onChange:this.onChangePassword})]}),Object(m.jsx)("button",{class:"ui fluid large teal submit button",type:"submit",children:"Submit"})]})})]})}}]),a}(s.a.Component),M=Object(j.g)(_),I=a(219),R=a(231),A=a(220),U=a(234),H=a(235),P=a(205),F=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){return Object(r.a)(this,a),t.call(this,e)}return Object(l.a)(a,[{key:"render",value:function(){return Object(m.jsxs)("div",{children:[Object(m.jsxs)(I.a,{textAlign:"center",children:[Object(m.jsx)(R.a,{as:"h1",children:"Receipt Tracker"}),Object(m.jsx)(A.a,{})]}),Object(m.jsx)(I.a,{children:Object(m.jsxs)(U.a,{placeholder:!0,children:[Object(m.jsxs)(H.a,{columns:2,relaxed:"very",stackable:!0,children:[Object(m.jsx)(H.a.Column,{children:Object(m.jsx)(M,{})}),Object(m.jsx)(H.a.Column,{verticalAlign:"middle",children:Object(m.jsxs)("div",{class:"ui message",children:["Don't have an account?",Object(m.jsx)(P.a,{children:Object(m.jsx)(u.b,{to:"/register",children:"Register"})})]})})]}),Object(m.jsx)(A.a,{vertical:!0})]})})]})}}]),a}(s.a.Component),L=a(16),T=Object(j.g)((function(e){return Object(m.jsxs)("div",{class:"ui four item menu",children:[Object(m.jsx)(u.b,{class:"item",to:"/account",children:"Account"}),Object(m.jsx)(u.b,{class:"item",to:"/upload",children:"Upload"}),Object(m.jsx)(u.b,{class:"item",to:"/receipts",children:"Receipts"}),Object(m.jsx)(u.b,{class:"item",onClick:function(){D.logout((function(){return e.history.push("/")}))},children:"Log Out"})]})})),V=a(53),B=a(224),N=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).onChangeFile=function(e){n.setState({fileChosen:e.target.files[0]})},n.onChangeLoader=function(e,t){n.setState({loading:e},(function(){t&&n.props.handleData(t)}))},n.onSubmitFile=function(e){e.preventDefault();var t=new FormData;t.append("avatar",n.state.fileChosen);var a={headers:{"content-type":"multipart/form-data"},Authorization:n.props.token,withCredentials:!0};n.onChangeLoader(!0,null),O.a.post("http://localhost:3131/upload",t,a).then((function(e){n.onChangeLoader(!1,e.data.data)})).catch((function(e){return n.props.handleCompletion("INCOMPLETE")}))},n.selectFile=function(e){n.setState({fileName:""}),e.target.nextSibling.click()},n.onChangeFile=n.onChangeFile.bind(Object(o.a)(n)),n.onSubmitFile=n.onSubmitFile.bind(Object(o.a)(n)),n.onChangeLoader=n.onChangeLoader.bind(Object(o.a)(n)),n.state={fileChosen:null,loading:!1,cell:{row:"",name:""},fileName:null},n}return Object(l.a)(a,[{key:"render",value:function(){return Object(m.jsx)(I.a,{textAlign:"center",children:Object(m.jsxs)(U.a,{basic:!0,children:[Object(m.jsx)(R.a,{icon:!0,children:Object(m.jsx)(V.a,{name:"file image outline"})}),Object(m.jsxs)(B.a,{id:"upload-form",loading:this.state.loading,children:[Object(m.jsxs)(B.a.Field,{children:[Object(m.jsx)("label",{children:this.state.fileChosen?this.state.fileChosen.name:null}),Object(m.jsx)(P.a,{onClick:this.selectFile,children:"Select File"}),Object(m.jsx)("input",{id:"fileUpload",onChange:this.onChangeFile,type:"file",name:"receipt",hidden:!0})]}),Object(m.jsx)(P.a,{size:"medium",color:"blue",type:"submit",onClick:this.onSubmitFile,children:"Upload"})]})]})})}}]),a}(s.a.Component),z=a(226),K=a(221),q=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).onChangeCell=function(e){var t=e.target.closest("tr").getAttribute("id"),a=e.target.getAttribute("id");if(null==a)return!1;n.setState((function(e){return Object(L.a)(Object(L.a)({},e),{},{cell:{row:t,name:a}})}))},n.onDelete=function(e){var t=e.target.closest("tr").id,a=Object(L.a)({},n.props.data).items;delete a[t],n.props.handleData({items:a})},n.saveReceipt=function(){n.setState({loading:!0});var e=n.props.data;O.a.post("http://localhost:3131/submit_receipt",e,{withCredentials:!0}).then((function(e){console.log(e),n.setState({loading:!1},(function(){n.props.setComplete(!1)}))})).catch((function(e){console.log(e),n.props.setComplete(!0)}))},n.handleEnter=function(e){"Enter"===e.code&&n.setState({cell:{row:"",name:""}})},n.otherChange=function(e){var t=e.target.value,a=e.target.id,s=Object(L.a)({},n.props.data),c=s.store,i=s.date;"store"===a?c=t:i=t,n.props.handleData({store:c,date:i})},n.valueChange=function(e){console.log("cur va",e.target.value);var t=e.target.defaultValue,a=e.target.id,s=e.target.closest("tr").id,c=Object(L.a)({},n.props.data).items;for(var i in c)c[i].item_name===t&&"item"===a&&s==i&&(c[i].item_name=e.target.value),c[i].price===t&&"price"===a&&s==i&&(c[i].price=e.target.value);n.props.handleData({items:c})},n.valueChange=n.valueChange.bind(Object(o.a)(n)),n.onChangeCell=n.onChangeCell.bind(Object(o.a)(n)),n.onDelete=n.onDelete.bind(Object(o.a)(n)),n.saveReceipt=n.saveReceipt.bind(Object(o.a)(n)),n.handleEnter=n.handleEnter.bind(Object(o.a)(n)),n.state={cell:{row:"",name:""},loading:!1},n}return Object(l.a)(a,[{key:"render",value:function(){var e=this;if(null==this.props.data)return Object(m.jsx)("div",{});var t=this.props.data.date,a=this.props.data.store,n=this.props.data.items;return Object(m.jsxs)("div",{children:[Object(m.jsx)(P.a,{floated:"right",color:"green",onClick:this.saveReceipt,basic:!0,loading:this.state.loading,children:"Save Receipt"}),Object(m.jsxs)(z.a,{onKeyDown:this.handleEnter,children:[Object(m.jsxs)(z.a.Header,{children:[Object(m.jsxs)(z.a.Row,{children:[Object(m.jsx)(z.a.HeaderCell,{children:"Date"}),Object(m.jsx)(z.a.HeaderCell,{children:"Store"}),Object(m.jsx)(z.a.HeaderCell,{})]}),Object(m.jsxs)(z.a.Row,{onClick:this.onChangeCell,id:"initial",children:["date"==this.state.cell.name?Object(m.jsx)(z.a.Cell,{children:Object(m.jsx)(K.a,{defaultValue:t,id:"date",onChange:this.otherChange})}):Object(m.jsx)(z.a.Cell,{value:t,id:"date",children:t}),"store"==this.state.cell.name?Object(m.jsx)(z.a.Cell,{children:Object(m.jsx)(K.a,{defaultValue:a,id:"store",onChange:this.otherChange})}):Object(m.jsx)(z.a.Cell,{value:a,id:"store",children:a})]}),Object(m.jsxs)(z.a.Row,{children:[Object(m.jsx)(z.a.HeaderCell,{children:"Item"}),Object(m.jsx)(z.a.HeaderCell,{children:"Price"}),Object(m.jsx)(z.a.HeaderCell,{})]})]}),Object(m.jsx)(z.a.Body,{children:Object.keys(n).map((function(t){var a=n[t].item_name,s=n[t].price;return Object(m.jsxs)(z.a.Row,{onClick:e.onChangeCell,id:t,children:[e.state.cell.row==t&&"item"==e.state.cell.name?Object(m.jsx)(z.a.Cell,{children:Object(m.jsx)(K.a,{defaultValue:a,id:"item",onChange:e.valueChange})}):Object(m.jsx)(z.a.Cell,{value:a,name:a,id:"item",children:a}),e.state.cell.row==t&&"price"==e.state.cell.name?Object(m.jsx)(z.a.Cell,{children:Object(m.jsx)(K.a,{defaultValue:s,id:"price",onChange:e.valueChange})}):Object(m.jsx)(z.a.Cell,{value:s,name:s,id:"price",children:s}),Object(m.jsx)(z.a.Cell,{children:Object(m.jsx)(P.a,{floated:"right",color:"red",onClick:e.onDelete,children:"Delete Item"})})]},t)}))})]})]})}}]),a}(s.a.Component),J=function(e){var t=e.completion;return"COMPLETED"===t?Object(m.jsx)(p.a,{success:!0,header:"receipt uploaded successfully",content:"viewable in receipts"}):"INCOMPLETE"===t?Object(m.jsx)(p.a,{negative:!0,header:"something went wrong try again."}):null},W=a(223),Y=a(137),G=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).handleData=function(e){var t=e.email,a=e.items,s=e.store,c=e.date;n.setState((function(e){return Object(L.a)(Object(L.a)({},e),{},{data:{email:t||e.data.email,items:a||e.data.items,store:s||e.data.store,date:c||e.data.date},exists:!0})}))},n.handleCompletion=function(e){if(e)return n.setState({completion:"INCOMPLETE"});n.setState({completion:"COMPLETED"})},n.handleData=n.handleData.bind(Object(o.a)(n)),n.handleCompletion=n.handleCompletion.bind(Object(o.a)(n)),n.state={data:{email:"",items:{},store:"",date:""},exists:null,completion:""},n}return Object(l.a)(a,[{key:"render",value:function(){return Object(m.jsxs)("div",{class:"ui container",children:[Object(m.jsx)(T,{}),Object(m.jsx)(J,{completion:this.state.completion}),Object(m.jsx)("h1",{children:" Upload Receipt "}),Object(m.jsx)(I.a,{textAlign:"right",children:Object(m.jsx)(W.a,{trigger:Object(m.jsx)(P.a,{icon:"question"}),children:Object(m.jsx)(Y.a,{children:Object(m.jsxs)(U.a,{basic:!0,padded:!0,children:["+ click cell to edit data ",Object(m.jsx)("br",{}),"+ save data"]})})})}),Object(m.jsx)(U.a,{children:Object(m.jsx)(N,{handleData:this.handleData,handleCompletion:this.handleCompletion})}),Object(m.jsx)(U.a,{padded:"very",children:this.state.exists?Object(m.jsx)(q,{handleData:this.handleData,data:this.state.data,setComplete:this.handleCompletion}):null})]})}}]),a}(s.a.Component),Q=a(227),X=a(229),Z=function(e){var t=e.store,a=e.date,n=e.handleDelete,s=e.operateModal,c=e.loading,i=e.handleEdit;return Object(m.jsx)(U.a,{basic:!0,children:Object(m.jsxs)(X.a,{children:[Object(m.jsxs)(X.a.Content,{children:[Object(m.jsx)(X.a.Header,{children:t}),Object(m.jsx)(X.a.Meta,{children:a})]}),Object(m.jsx)(X.a.Content,{extra:!0,children:Object(m.jsxs)("div",{class:"ui three buttons",children:[Object(m.jsx)(P.a,{id:"view",onClick:s,color:"green",children:"View"}),Object(m.jsx)(P.a,{id:"edit",color:"black",onClick:i,children:"Edit"}),Object(m.jsx)(P.a,{id:"delete",onClick:n,color:"red",loading:c,children:"Delete"})]})})]})})},$=a(232),ee=a(222),te=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).cellClicked=function(e){var t=e.target.closest("tr").id,a=e.target.id;console.log("in the click",t+a),n.setState({key:t,clicked_id:a})},n.inputChange=function(e){var t=e.target.value,a=n.state.key,s=e.target.id;n.setState((function(e){return"store"===s?e.store=t:"date"===s?e.date=t:e.items[a][s]=t,e}))},n.handleEnter=function(e){"Enter"===e.code&&n.setState({clicked_id:""})},n.handleItemDelete=function(e){var t=e.target.closest("tr").id;n.setState((function(e){return delete e.items[t],e}))},n.submitChange=function(){n.setState({dimmer:!0,loader:!0});var e=n.state.store,t=n.state.date,a=n.props.data.receipt_id,s=Object.keys(n.state.items).map((function(e){var t=n.state.items;return[t[e].item_name,t[e].item_price,n.props.data.receipt_id]}));O.a.put("/receipts/update",{store:e,date:t,items:s,receipt_id:a},{withCredentials:!0}).then((function(e){return n.setState({dimmer:!1,loader:!1},(function(){n.props.setMessage("success"),n.props.operateModal()}))})).catch((function(e){return n.setState({dimmer:!1,loader:!1},(function(){n.props.setMessage("error")}))}))},n.state={items:n.props.data.items,store:n.props.data.store,date:n.props.data.receipt_date,key:"",clicked_id:"",dimmer:!1,loader:!1},n}return Object(l.a)(a,[{key:"render",value:function(){var e=this,t=this.state.key+this.state.clicked_id;return console.log(t,"clicked cell"),Object(m.jsxs)(I.a,{children:[Object(m.jsx)($.a,{active:this.state.dimmer,children:Object(m.jsx)(ee.a,{active:this.state.loader})}),Object(m.jsxs)(z.a,{onKeyDown:this.handleEnter,attached:"top",children:[Object(m.jsx)(z.a.Header,{children:Object(m.jsxs)(z.a.Row,{children:[Object(m.jsx)(z.a.HeaderCell,{children:"Store"}),Object(m.jsx)(z.a.HeaderCell,{children:"Date"})]})}),Object(m.jsx)(z.a.Body,{children:Object(m.jsxs)(z.a.Row,{id:"header",children:[Object(m.jsx)(z.a.Cell,{id:"store",onClick:this.cellClicked,children:"store"===this.state.clicked_id?Object(m.jsx)(K.a,{id:"store",defaultValue:this.state.store,onChange:this.inputChange}):this.state.store}),Object(m.jsx)(z.a.Cell,{id:"date",onClick:this.cellClicked,children:"date"===this.state.clicked_id?Object(m.jsx)(K.a,{id:"date",defaultValue:this.state.date,onChange:this.inputChange}):this.state.date})]})})]}),Object(m.jsxs)(z.a,{onKeyDown:this.handleEnter,attached:"bottom",children:[Object(m.jsx)(z.a.Header,{children:Object(m.jsxs)(z.a.Row,{children:[Object(m.jsx)(z.a.HeaderCell,{children:"Item"}),Object(m.jsx)(z.a.HeaderCell,{children:"Price"}),Object(m.jsx)(z.a.HeaderCell,{})]})}),Object(m.jsx)(z.a.Body,{children:Object.keys(this.state.items).map((function(a){var n=e.state.items[a].item_name,s=e.state.items[a].item_price;return Object(m.jsxs)(z.a.Row,{id:a,children:[t===a+"item_name"?Object(m.jsx)(K.a,{id:"item_name",onChange:e.inputChange,defaultValue:n}):Object(m.jsx)(z.a.Cell,{id:"item_name",onClick:e.cellClicked,children:n}),t===a+"item_price"?Object(m.jsx)(K.a,{id:"item_price",onChange:e.inputChange,defaultValue:s}):Object(m.jsx)(z.a.Cell,{id:"item_price",onClick:e.cellClicked,children:s}),Object(m.jsx)(z.a.Cell,{children:Object(m.jsx)(P.a,{size:"small",onClick:e.handleItemDelete,color:"red",children:"Delete Item"})})]},a)}))})]}),Object(m.jsx)(P.a,{floated:"right",onClick:this.submitChange,color:"green",children:"Submit Changes"})]})}}]),a}(s.a.Component),ae=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).handleDelete=function(e){var t={params:{receipt_id:n.state.data.receipt_id}};n.setState({deleteLoading:!0});O.a.delete("/receipts/delete",t,{withCredentials:!0}).then((function(e){n.setState({deleteLoading:!1}),n.props.getAll()})).catch((function(e){return console.log(e)}))},n.operateModal=function(){n.setState((function(e){return Object(L.a)(Object(L.a)({},e),{},{showModal:!e.showModal})}),(function(){!0===n.state.showModal&&n.props.modalOn===n.state.data.receipt_id&&(console.log("clearrrrrrrrring"),n.props.clearModal(""))}))},n.handleEdit=function(){n.setState({edit_table:!0})},n.handleDelete=n.handleDelete.bind(Object(o.a)(n)),n.operateModal=n.operateModal.bind(Object(o.a)(n)),n.handleEdit=n.handleEdit.bind(Object(o.a)(n)),console.log(n.props.data),n.state={data:n.props.data,deleteLoading:!1,showModal:!1,edit_table:!1},n}return Object(l.a)(a,[{key:"componentDidMount",value:function(){this.props.modalOn===this.state.data.receipt_id&&this.setState({showModal:!0})}},{key:"componentDidUpdate",value:function(e){if(this.props.modalOn!==e.modalOn&&this.props.modalOn===this.state.data.receipt_id)return this.setState({showModal:!0})}},{key:"render",value:function(){var e=this;console.log("modalOn?",this.props.modalOn,this.state.showModal);var t=this.props.data.store,a=this.props.data.receipt_date;return Object(m.jsxs)("div",{children:[Object(m.jsx)(Z,{store:t,date:a,handleDelete:this.handleDelete,handleEdit:this.handleEdit,operateModal:this.operateModal,loading:this.state.deleteLoading}),Object(m.jsx)(Q.a,{onClose:function(){e.setState({edit_table:!1})},open:this.state.edit_table,children:Object(m.jsx)(te,{data:this.state.data,setMessage:this.props.setMessage,operateModal:function(){return e.setState({edit_table:!1})}})}),Object(m.jsx)(Q.a,{onClose:this.operateModal,onOpen:this.operateModal,open:this.state.showModal,children:Object(m.jsx)(I.a,{children:Object(m.jsxs)(z.a,{fixed:!0,basic:!0,children:[Object(m.jsx)(z.a.Header,{children:Object(m.jsxs)(z.a.Row,{children:[Object(m.jsx)(z.a.HeaderCell,{children:"Item"}),Object(m.jsx)(z.a.HeaderCell,{children:"Price"})]})}),Object(m.jsx)(z.a.Body,{children:Object.keys(this.state.data.items).map((function(t){return Object(m.jsxs)(z.a.Row,{id:"item",children:[Object(m.jsx)(z.a.Cell,{id:"item_name",children:e.state.data.items[t].item_name}),Object(m.jsx)(z.a.Cell,{id:"price",children:e.state.data.items[t].item_price})]},t)}))})]})})})]})}}]),a}(s.a.Component),ne=a(225),se=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).handleSearchChange=function(e){var t=e.target.value;if(0===t.length)return n.setState({value:t,results:[]});n.setState({loading:!0}),O.a.get("/receipts/search",{params:{value:t}},{withCredentials:!0}).then((function(e){var a=e.data.data.rows.map((function(e){return Object(L.a)(Object(L.a)({},e),{},{key:e.price})}));n.setState({results:a,value:t,loading:!1})})).catch((function(e){console.log(e)}))},n.handleSearchChange=n.handleSearchChange.bind(Object(o.a)(n)),n.state={results:[],value:"",loading:!1},n}return Object(l.a)(a,[{key:"render",value:function(){var e=this;return Object(m.jsx)(ne.a,{loading:this.state.loading,onResultSelect:function(t,a){return e.props.setModal(a.result.price)},onSearchChange:this.handleSearchChange,results:this.state.results,value:this.state.value})}}]),a}(s.a.Component),ce=function(){return Object(m.jsx)(p.a,{success:!0,header:"Password changed successfully"})},ie=function(){return Object(m.jsx)(p.a,{success:!0,header:"Email changed successfully"})},re=function(){return Object(m.jsx)(p.a,{success:!0,header:"Receipt updated successfully"})},le=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).getAll=function(e){var t;t=e?{params:{specific:e}}:{params:{quantity:10}},O.a.get("/receipts",t,{withCredentials:!0}).then((function(t){var a=t.data.data;n.createDataObject(a,e)})).catch((function(e){return n.setState({success:!1})}))},n.createDataObject=function(e,t){var a={};Object.keys(e).forEach((function(t){var n=e[t].receipt_id;n in a||(a[n]={store:e[t].store,receipt_date:e[t].receipt_date.split("T")[0],receipt_id:e[t].receipt_id,items:[]}),a[n].items.push({item_name:e[t].item_name,item_price:e[t].item_price})})),n.setState((function(e){return t?Object(L.a)(Object(L.a)({},e),{},{data:a,selected:t}):Object(L.a)(Object(L.a)({},e),{},{data:a,selected:""})}))},n.setMessage=function(e){return"success"===e?n.setState({success:!0}):"error"===e?n.setState({success:!1}):void n.setState({success:null})},n.setModal=function(e){return n.state.data[e]||""===e?n.setState({selected:e}):n.getAll(e)},n.getAll=n.getAll.bind(Object(o.a)(n)),n.createDataObject=n.createDataObject.bind(Object(o.a)(n)),n.setMessage=n.setMessage.bind(Object(o.a)(n)),n.setModal=n.setModal.bind(Object(o.a)(n)),n.state={currentUser:D.getUser(),data:null,update:!1,success:null,selected:""},n}return Object(l.a)(a,[{key:"componentDidMount",value:function(){this.getAll()}},{key:"render",value:function(){var e=this;return null==this.state.data?Object(m.jsxs)("div",{class:"ui container",children:[Object(m.jsx)(T,{}),Object(m.jsx)("h1",{children:" Current Receipts "})]}):Object(m.jsxs)("div",{class:"ui container",children:[Object(m.jsx)(T,{}),Object(m.jsx)("h1",{children:" Current Receipts "}),Object(m.jsx)(se,{setModal:this.setModal}),!0===this.state.success?Object(m.jsx)(re,{}):null,!1===this.state.success?Object(m.jsx)(E,{}):null,Object(m.jsx)(U.a,{padded:!0,children:Object(m.jsx)(X.a.Group,{children:Object.keys(this.state.data).map((function(t){return Object(m.jsx)(ae,{getAll:e.getAll,data:e.state.data[t],setMessage:e.setMessage,modalOn:e.state.selected,clearModal:e.setModal},t)}))})})]})}}]),a}(s.a.Component),oe=function(){return Object(m.jsx)(p.a,{success:!0,header:"Congratulations! You're registered.",content:"You may log in."})},de=function(e){var t=e.success;return!0===t?Object(m.jsx)(oe,{}):!1===t?Object(m.jsx)(x,{}):null},he=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).onChangeEmail=function(e){n.setState({email:e.target.value})},n.onChangePassword=function(e){n.setState({password:e.target.value})},n.getSubmit=function(e){e.preventDefault();var t={email:n.state.email,password:n.state.password};O.a.post("http://localhost:3131/register",t).then((function(e){n.setState({success:!0})})).catch((function(e){n.setState({success:!1})}))},n.onChangeEmail=n.onChangeEmail.bind(Object(o.a)(n)),n.onChangePassword=n.onChangePassword.bind(Object(o.a)(n)),n.state={email:"",password:"",loading:!1,success:null},n}return Object(l.a)(a,[{key:"render",value:function(){return Object(m.jsxs)("div",{children:[Object(m.jsx)(de,{success:this.state.success}),Object(m.jsx)("form",{class:"ui large form",onSubmit:this.getSubmit,children:Object(m.jsxs)("div",{class:"ui stacked segment",children:[Object(m.jsxs)("div",{class:"field",children:[Object(m.jsx)("label",{children:"Email"}),Object(m.jsx)("input",{onChange:this.onChangeEmail,value:this.state.email,type:"email",id:"email",name:"email"})]}),Object(m.jsxs)("div",{class:"field",children:[Object(m.jsx)("label",{children:"Password"}),Object(m.jsx)("input",{type:"password",id:"password",name:"password",value:this.state.password,onChange:this.onChangePassword})]}),Object(m.jsx)("button",{class:"ui fluid large teal submit button",type:"submit",children:"Submit"})]})})]})}}]),a}(s.a.Component),je=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(){return Object(r.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){var e=this;return Object(m.jsxs)(U.a,{compact:!0,children:[Object(m.jsx)(U.a,{basic:!0,children:Object(m.jsx)(P.a,{floated:"right",onClick:function(){e.props.history.push("/")},children:"Back"})}),Object(m.jsx)(U.a,{basic:!0,children:Object(m.jsx)(he,{})})]})}}]),a}(s.a.Component),ue=a(127),be=["component"],Oe=function(e){var t=e.component,a=Object(ue.a)(e,be);return Object(m.jsx)(j.b,Object(L.a)(Object(L.a)({},a),{},{render:function(e){return!0===D.isAuth()?Object(m.jsx)(t,Object(L.a)({},e)):Object(m.jsx)(j.a,{to:{pathname:"/",state:{from:e.location}}})}}))},pe=["component"],me=function(e){var t=e.component,a=Object(ue.a)(e,pe);return Object(m.jsx)(j.b,Object(L.a)(Object(L.a)({},a),{},{render:function(e){return!0===D.isAuth()?Object(m.jsx)(j.a,{to:{pathname:"/upload",state:{from:e.location}}}):Object(m.jsx)(t,Object(L.a)({},e))}}))},xe=a(228),fe=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).handleSubmit=function(e){if(e.preventDefault(),n.state.new!==n.state.confirm)return n.setState({error:"confirm"});var t={old:n.state.old,new:n.state.new};O.a.put("/change/password",t,{withCredentials:!0}).then((function(e){if("password-no-match"===e.data.message)return n.setState({error:"old"});n.props.cancel("password")})).catch((function(e){n.props.handleError("passChange")}))},n.handleInput=function(e){var t=e.target.id;"old"===t&&n.setState({old:e.target.value}),"new"===t&&n.setState({new:e.target.value}),"confirm"===t&&n.setState({confirm:e.target.value})},n.state={new:"",confirm:"",old:"",error:null,success:!1},n}return Object(l.a)(a,[{key:"render",value:function(){return Object(m.jsx)("div",{children:Object(m.jsxs)(B.a,{onSubmit:this.handleSubmit,children:[Object(m.jsxs)(B.a.Field,{children:[Object(m.jsx)("label",{children:"old password"}),Object(m.jsx)("input",{id:"old",type:"password",placeholder:"old password",onChange:this.handleInput}),"old"===this.state.error?Object(m.jsx)(k,{}):null]}),Object(m.jsxs)(B.a.Field,{children:[Object(m.jsx)("label",{children:"new password"}),Object(m.jsx)("input",{id:"new",type:"password",placeholder:"new password",onChange:this.handleInput})]}),Object(m.jsxs)(B.a.Field,{children:[Object(m.jsx)("label",{children:"confirm new password"}),Object(m.jsx)("input",{id:"confirm",type:"password",placeholder:"confirm password",onChange:this.handleInput}),"confirm"===this.state.error?Object(m.jsx)(w,{}):null]}),Object(m.jsx)(P.a,{type:"submit",children:"Submit"}),Object(m.jsx)(P.a,{onClick:this.props.cancel,children:"Cancel"})]})})}}]),a}(s.a.Component),ge=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).handleClick=function(){n.setState({button:!1,success:""})},n.handleCancel=function(e){"password"===e&&n.setState({button:!0,success:"password"}),n.setState({button:!0})},n.handleCancel=n.handleCancel.bind(Object(o.a)(n)),n.handleClick=n.handleClick.bind(Object(o.a)(n)),n.state={button:!0,success:""},n}return Object(l.a)(a,[{key:"render",value:function(){return Object(m.jsx)("div",{children:Object(m.jsxs)("div",{children:[this.state.button?Object(m.jsx)(xe.a.Header,{onClick:this.handleClick,children:"Change Password"}):Object(m.jsx)(fe,{cancel:this.handleCancel,handleError:this.props.handleError}),"password"===this.state.success?Object(m.jsx)(ce,{}):null]})})}}]),a}(s.a.Component),Ce=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).handleSubmit=function(e){if(e.preventDefault(),n.state.new!==n.state.confirm)return n.setState({error:"confirm"});var t={new:n.state.new};O.a.post("/change/email",t,{withCredentials:!0}).then((function(e){if("email-in-use"===e.data.message)return n.setState({error:"in-use"});n.props.cancel("email")})).catch((function(e){n.props.handleError("emailChange")}))},n.handleInput=function(e){var t=e.target.id;"new"===t&&n.setState({new:e.target.value}),"confirm"===t&&n.setState({confirm:e.target.value})},n.state={new:"",confirm:"",error:null,success:!1},n}return Object(l.a)(a,[{key:"render",value:function(){return Object(m.jsx)("div",{children:Object(m.jsxs)(B.a,{onSubmit:this.handleSubmit,children:[Object(m.jsxs)(B.a.Field,{children:[Object(m.jsx)("label",{children:"new email"}),Object(m.jsx)("input",{id:"new",type:"email",placeholder:"new email",onChange:this.handleInput}),"in-use"===this.state.error?Object(m.jsx)(y,{}):null]}),Object(m.jsxs)(B.a.Field,{children:[Object(m.jsx)("label",{children:"confirm new email"}),Object(m.jsx)("input",{id:"confirm",type:"email",placeholder:"confirm email",onChange:this.handleInput}),"confirm"===this.state.error?Object(m.jsx)(S,{}):null]}),Object(m.jsx)(P.a,{type:"submit",children:"Submit"}),Object(m.jsx)(P.a,{onClick:this.props.cancel,children:"Cancel"})]})})}}]),a}(s.a.Component),ve=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).handleClick=function(){n.setState({button:!1,success:""})},n.handleCancel=function(e){"email"===e&&n.setState({button:!0,success:"email"}),n.setState({button:!0})},n.handleCancel=n.handleCancel.bind(Object(o.a)(n)),n.handleClick=n.handleClick.bind(Object(o.a)(n)),n.state={button:!0,success:""},n}return Object(l.a)(a,[{key:"render",value:function(){return Object(m.jsx)("div",{children:Object(m.jsxs)("div",{children:[this.state.button?Object(m.jsx)(xe.a.Header,{onClick:this.handleClick,children:"Change Email"}):Object(m.jsx)(Ce,{cancel:this.handleCancel,handleError:this.props.handleError}),"email"===this.state.success?Object(m.jsx)(ie,{}):null]})})}}]),a}(s.a.Component),we=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).handleSubmit=function(e){if(e.preventDefault(),n.state.user!==n.state.confirm)return n.setState({error:"confirm"});var t={email:n.state.user};O.a.delete("/change/delete",t,{withCredentials:!0}).then((function(e){D.logout((function(){n.props.history.push("/")}))})).catch((function(e){return n.props.handleError("delete")}))},n.handleInput=function(e){"confirm"===e.target.id&&n.setState({confirm:e.target.value})},n.state={user:D.getUser(),confirm:"",error:null},n}return Object(l.a)(a,[{key:"render",value:function(){return Object(m.jsx)("div",{children:Object(m.jsxs)(B.a,{onSubmit:this.handleSubmit,children:[Object(m.jsxs)(B.a.Field,{children:[Object(m.jsx)("label",{children:"Account will be deleted after email is confirmed"}),Object(m.jsx)("input",{id:"confirm",type:"email",placeholder:"confirm email",onChange:this.handleInput}),"confirm"===this.state.error?Object(m.jsx)(S,{}):null]}),Object(m.jsx)(P.a,{type:"submit",children:"Submit"}),Object(m.jsx)(P.a,{onClick:this.props.cancel,children:"Cancel"})]})})}}]),a}(s.a.Component),ke=Object(j.g)(we),Se=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).handleClick=function(){n.setState({button:!1,success:""})},n.handleCancel=function(){n.setState({button:!0})},n.handleCancel=n.handleCancel.bind(Object(o.a)(n)),n.handleClick=n.handleClick.bind(Object(o.a)(n)),n.state={button:!0,error:null},n}return Object(l.a)(a,[{key:"render",value:function(){return Object(m.jsx)("div",{children:Object(m.jsx)("div",{children:this.state.button?Object(m.jsx)(xe.a.Header,{onClick:this.handleClick,children:"Delete Account"}):Object(m.jsx)(ke,{cancel:this.handleCancel,handleError:this.props.handleError})})})}}]),a}(s.a.Component),ye=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).handleError=function(e){return n.setState({error:e})},n.handleError=n.handleError.bind(Object(o.a)(n)),n.state={user:D.getUser(),error:null},n}return Object(l.a)(a,[{key:"render",value:function(){return Object(m.jsxs)("div",{class:"ui container",children:[Object(m.jsx)(T,{}),Object(m.jsxs)("h1",{children:["Welcome, ",this.state.user]}),Object(m.jsxs)(U.a,{basic:!0,children:["delete"===this.state.error?Object(m.jsx)(f,{}):null,"emailChange"===this.state.error?Object(m.jsx)(g,{}):null,"passChange"===this.state.error?Object(m.jsx)(C,{}):null]}),Object(m.jsxs)(xe.a,{animated:!0,verticalAlign:"middle",children:[Object(m.jsxs)(xe.a.Item,{children:[Object(m.jsx)(V.a,{name:"edit"}),Object(m.jsx)(xe.a.Content,{children:Object(m.jsx)(ge,{handleError:this.handleError})})]}),Object(m.jsxs)(xe.a.Item,{children:[Object(m.jsx)(V.a,{name:"edit"}),Object(m.jsx)(xe.a.Content,{children:Object(m.jsx)(ve,{handleError:this.handleError})})]}),Object(m.jsxs)(xe.a.Item,{children:[Object(m.jsx)(V.a,{name:"trash alternate outline",color:"red"}),Object(m.jsx)(xe.a.Content,{children:Object(m.jsx)(Se,{handleError:this.handleError})})]})]})]})}}]),a}(s.a.Component),Ee=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).setUser=function(){n.setState({user:D.getUser()})},n.setUser=n.setUser.bind(Object(o.a)(n)),n.state={user:D.getUser(),jwt:null},n}return Object(l.a)(a,[{key:"componentDidUpdate",value:function(){this.setState({user:D.getUser()}),this.setState({jwt:D.getToken()})}},{key:"render",value:function(){return Object(m.jsxs)(j.d,{children:[Object(m.jsx)(me,{path:"/",exact:!0,component:F}),Object(m.jsx)(Oe,{path:"/account",exact:!0,component:ye}),Object(m.jsx)(Oe,{path:"/upload",exact:!0,component:G}),Object(m.jsx)(Oe,{path:"/receipts",exact:!0,component:le}),Object(m.jsx)(me,{path:"/register",exact:!0,component:je})]})}}]),a}(s.a.Component);a(202),a(203);i.a.render(Object(m.jsx)(u.a,{children:Object(m.jsx)(Ee,{})}),document.getElementById("root"))}},[[204,1,2]]]);
//# sourceMappingURL=main.fb0a5d4e.chunk.js.map