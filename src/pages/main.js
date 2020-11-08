import React from 'react';
import AceEditor from 'react-ace';

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";


class Main extends React.Component{
 
    state= { code: '', input: '', output: ''};

    submit = async () => {
    const {code, input} = this.state;
    const res = await  fetch("http://localhost:8000/submission", { method: 'POST', body: { code, input}});

    if(res.ok) {
        const { output } = await res.json();
        this.setState({output});
    }
    
    }

    handleCodeChange = (code) => this.setState({code});
    handleInputChange = (input) => this.setState({input});

  render(){
    //   this.editor.resize();
    const { code, input, output } = this.state;
      
    return (
      <div className="container">
        <div className="head"><h1>Online IDE</h1></div>
        <div className="type">Type your code here:</div>
        <div className="input">Inputs</div>
        <div className="input_val" onChange={this.handleInputChange} value={input} >
          <textarea></textarea>
        </div>
        <div className="output">Outputs</div>
        <div className="output_val">I will give Output here: {output}</div>
        <div className="run" onClick={this.submit}><button>Build and Run</button></div>
        <div className="clear"><button>Clear</button></div>

        <div className="editor">
            <AceEditor 
            className="coder"
            placeholder="Write code here!!" 
            theme="monokai" 
            mode="python"
            height="500px"
            width="800px"
            showPrintMargin={false}
            showGutter={true}
            highlightActiveLine={true}
            fontSize={14}
            ref={(editor)=>this.editor=editor}
            editorProps={{$blockScrolling: true}}
            tabSize={10}
            value={code}
            onChange={this.handleCodeChange}
            setOptions={
                {
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableAutoIndent:true,
                enableSnippets: false,
                showLineNumbers: true,
                editorProps: {}
                }

            }
            />
        </div>
      
      </div>
    )
  }
}

export default Main;
