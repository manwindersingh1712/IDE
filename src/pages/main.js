import React from 'react';
import AceEditor from 'react-ace';

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";


class Main extends React.Component{
 
    


  render(){
    //   this.editor.resize();
      
    return (
      <div className="container">
        <div className="head"><h1>Online IDE</h1></div>
        <div className="type">Type your code here:</div>
        <div className="input">Inputs</div>
        <div className="input_val">I will take input</div>
        <div className="output">Outputs</div>
        <div className="output_val">I will give Output here</div>
        <div className="run"><button>Build and Run</button></div>
        <div className="clear"><button>Clear</button></div>

        <div className="editor">
            <AceEditor 
            className="coder"
            placeholder="Write code here!!" 
            theme="monokai" 
            mode="java"
            showPrintMargin={false}
            showGutter={true}
            highlightActiveLine={true}
            fontSize={14}
            ref={(editor)=>this.editor=editor}
            editorProps={{$blockScrolling: true}}
            tabSize={10}

            setOptions={
                {
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableAutoIndent:true,
                enableSnippets: false,
                showLineNumbers: true,
                }

            }
            />
        </div>
      
      </div>
    )
  }
}

export default Main;
