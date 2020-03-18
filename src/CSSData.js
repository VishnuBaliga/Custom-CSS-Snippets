const CSSData = [
    {
        id:'123',
        desc:'Hide SideBar',
        type:'chat-v1',
        code:`.css-list-item
        {
            display: flex;
            justify-content:space-between;
            align-items: center;
            border-bottom: thin solid #efefef;
            margin: 5px 0 10px;
            padding: 15px 0;
            p{
                margin:0;
            }
            span{
                background-color:#9b4dca;
                text-align: center;
                border-radius: 5px;
                padding: 0em 0.5em;
                color: #fff;
                font-size:12px;
                font-weight: 500;
            }
        }
        
        .ace-wrapper
        {
            padding-left: 0 10px;
        }
        
        #css-aceeditor
        {
            width: 100% !important;
        }`,
        
    },
    {
        id:'123',
        desc:'Hide ProgressBar',
        type:'chat-v1',
        code:` 
        .ace-wrapper
        {
            padding-left: 0 10px;
        }
        
        #css-aceeditor
        {
            width: 100% !important;
        }`,

    }
]

export default CSSData