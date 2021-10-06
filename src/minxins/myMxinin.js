let myMixin = {
    data:()=>{
        return {
            a:"修改组件"
        }
    },
    created: function () {
        this.hello()
    },
    props:{
        menus: {
            type: Array,
            default: () => []
        },
        pageProxy:{
            type:Object
        }
    },
    methods: {
        hello: function () {
            console.log('hello from mixin!')
        },
        onInit(){
            //this.pageProxy.menus
            console.log('hello from onInit!')
        },
        provideMenuItems(menuItems){
            console.log(menuItems);
            return menuItems
        }
    },
    smartbi:{
        a:1
    },
    // template: "<div>1454554</div>"
    render(h){
        console.log(this);
        return (
            h ('p', '修改模版咯')
        )
    },



}

export default myMixin