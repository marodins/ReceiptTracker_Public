
class Receipt{
    constructor(text,req,res){
        this.fullReceipt = {
            email: req.session.email,
            parsed:[],
            store:'',
            items:[],
            date:''
        }
        this.text = text
        this.req = req
        this.res = res
        //this.id
    }

    setAll = async function(){
        await this.createParsed()
        await Promise.all([this.setItems(),this.setStore(),this.setDate()])
    }

    setDate = () =>{
        return Promise.resolve().then(()=>{
            var regexp = new RegExp('.*/\.*/\.*','g')
            var date = ''
            for(var item of this.fullReceipt.parsed){
                if(regexp.test(item)){

                    date = item
                    break;
                }
            }
            this.fullReceipt.date = date
        })
    }

    setItems = () =>{
        return Promise.resolve().then(()=>{
            console.log('in items')
            var allItems = {};
            var arr = this.fullReceipt.parsed
            var x = 0;
            console.log('in the set ite')
            const findItem = (start)=>{
                var item = ''
                var i = 1;
                while(isNaN(parseInt(arr[start-i])) && arr[start-i].length >1){
                    item+= arr[start-i] + '_';
                    i++;
                }
                console.log('this is the final item',item.trim())
                return item.trim().replace(/[:|]/g,'')
            }
            
            for(var item of arr){
                console.log(item)
                if(item.includes('.') && isNaN(parseInt(item)) === false){
                    var cost = item;
                    var gotItem = findItem(arr.indexOf(item));
                    allItems[x] = {item_name:gotItem,price:cost};
                    x++;
                }

            }
            this.fullReceipt.items = allItems
        })
        
    }
    setStore = () =>{
        return Promise.resolve().then(()=>{
                console.log('in store')
                var string = ''
                var i = 0;
                var arr = this.fullReceipt.parsed
                console.log(arr[i])
                while(arr[i]===arr[i].toUpperCase() && isNaN(parseInt(arr[i]))===true){
                    string += arr[i]+' '
                    i++
                }
                this.fullReceipt.store = string 
        })

    }


    createParsed = () =>{
        return new Promise((resolve)=>{
            console.log('abt to parse')
            var i = 0;
            var stringArr = []
            var string = ''
            var text = this.text
            while(text.length > i){
                if (text[i]==' ' || text[i]=='\n'){
                    stringArr.push(string.trim().replace(/[()#%$`¡™£¢∞§¶•ªº–≠‘“πøˆ¨¥†®´∑œåß∂ƒ©˙∆˚¬…æ÷≥≤µ˜∫√ç≈]/g,''));
                    string = '';
                }
                string+=text[i];
                i++; 
            }
            this.fullReceipt.parsed = stringArr
            resolve(this)
        })

    }
}

module.exports = {
    Receipt:Receipt
}