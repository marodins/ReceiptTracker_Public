// Analyzes the data returned by Tesseract for the receipt
// Class Receipt used to create instance of the analyzed receipt

class Receipt{
    constructor(text){
        this.fullReceipt = {
            parsed:[],
            store:'',
            items:[],
            date:''
        };
        this.text = text;
    }

    setAll = async function(){
        // runs methods and sets items, store, date
        await this.createParsed()
        return Promise.all([this.setItems(),this.setStore(),this.setDate()])
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
            var allItems = {};
            var arr = this.fullReceipt.parsed
            var x = 0;
            const findItem = (start)=>{
                var item = ''
                var i = 1;
                while(isNaN(parseInt(arr[start-i])) && arr[start-i].length >1){
                    item+= arr[start-i] + '_';
                    i++;
                }
                return item.trim().replace(/[:|]/g,'')
            }
            
            for(var item of arr){
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
                var string = ''
                var i = 0;
                var arr = this.fullReceipt.parsed
                while(arr[i]===arr[i].toUpperCase() && isNaN(parseInt(arr[i]))===true){
                    string += arr[i]+' '
                    i++
                }
                this.fullReceipt.store = string 
        })

    }


    createParsed = () =>{
        return new Promise((resolve)=>{
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