import React from 'react'; 
import axios from 'axios'; 

import AceEditor from 'react-ace'; 

import brace from 'brace';
import 'brace/mode/css';
import 'brace/theme/monokai'; 

import classnames from 'classnames';
import copy from 'copy-to-clipboard';


const AIRTABLE_API_KEY = `keyDK80FJl78M2lJg`;
const QUERY_PARAMS = `&sort%5B0%5D%5Bfield%5D=desc`;


const ListLoader = () => {
  return ( <div className="loader-container">
  <div className="css-list-item--loader" />
  <div className="css-list-item--loader" />
  <div className="css-list-item--loader" />
  <div className="css-list-item--loader" />   
</div>)
};

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      CSSVal:'',
      showCode: false,
      copying: false,
      cssData: null,
      loading: true,
      activeItem: null
    }
  }

showCode = (index) => {
  const {cssData} = this.state;
this.setState({
  CSSVal : cssData[index].fields.code,
  activeItem:index,
  showCode: true
});
}

handleCopy = (value) => {
  copy(value);
  this.setState({
    copying: true
  }, () => {
    setTimeout(() => {
      this.setState({
        copying: false
      });
    }, 1500);
  });  
} 

componentDidMount() { 

  this.setState({ loading: true });
  axios.get(`https://api.airtable.com/v0/app4o2guYDiUQTaxr/Table%201?api_key=${AIRTABLE_API_KEY}&&${QUERY_PARAMS}`).then(response => { 
    this.setState({ cssData: response.data.records, loading:false }); 
  }).catch(err => {
    this.setState({ loading:false });
    console.log('Error while fetching data from AirTable', err);
  });


}

render(){
  const {CSSVal, showCode, copying, cssData, loading, activeItem} = this.state;
  return (
    <div className="banner">
      <header className="header">
          <h2>Custom CSS Snippets</h2>
          <p>Custom-style your <a target="_blank" href="https://surveysparrow.com/">SurveySparrow</a> forms in seconds!</p>
          <p className="small" style={{paddingTop: '10px'}}>Developed by <a style={{borderBottom: 'thin dotted #fff'}} target="_blank" href="https://vishnubaliga.com/">Vishnu Baliga</a></p>
      </header>

      <div className="container-main"> 
          <div className="container"> 
          <div className="row">
          <div className="column">
            <h4>Choose your Snippet!</h4>  
          </div> 
          </div>

        {loading? <ListLoader /> : <div className="row">
            <div className={classnames({ 'column': true })}>

                {cssData && cssData.map((value,index)=>{
                  return(
                    <div key={index} className={classnames({ 'css-list-item': true, 'active': index === activeItem })} onClick={()=>this.showCode(index)}>
                      <p>{value.fields.desc}</p> 
                  <span className={classnames({ 
                  'chat': value.fields.type === `Chat-v1`, 
                  // 'classic': value.fields.type === `Classic-v2` 
                  })}> {value.fields.type}</span>
                    </div> 
                  )
                })}
              </div>
              {showCode &&  <div className={classnames({ 
                'column': true,  
                'container--right': true,
                 })}>
                     <div className="container-right--contents">
                     <div className="row">
                      <div className="column ace-actions"> 
                            <a onClick={() => copying ? null : this.handleCopy(CSSVal)}>{copying ? `Copying` : `Click here to copy Css`}</a>
                      </div> 
                      </div>
                <div className="ace-wrapper">
                  <AceEditor
                      placeholder="Custom CSS"
                      mode="css"
                      theme="monokai"
                      name="css-aceeditor"  
                      fontSize={14}
                      // showPrintMargin={true}
                      // showGutter={true}
                      // highlightActiveLine={true}
                      value={CSSVal}
                      // setOptions={{ 
                      // showLineNumbers: true,
                      // tabSize: 4, 
                      // }}
                      />
              
                </div> 
              </div> 
              </div> 
              }
            </div>
}
        </div> 
      </div>

    <div className="container" style={{paddingBottom: '15px'}}>
      <footer id="footer"><p className="small">Developed with ❤ by <a target="_blank" href="https://vishnubaliga.com/">Vishnu Baliga</a></p></footer> 
    </div>

    </div>
  );
}
}

export default App;
