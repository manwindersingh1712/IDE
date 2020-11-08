import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/python";

const languages = ["python", "c_cpp"];
const snippetc = `#include<iostream>

using namespace std;

int main(){
   //write your code here
   cout<<"Hello World";
   return 0;
}`;

const snippetp = `print(5);`;

class Main extends React.Component {
  state = { code: snippetp, input: "", output: "", mode: "python" };

  submit = async () => {
    const { code, input, mode } = this.state;
    const res = await fetch("http://localhost:8000/submissions", {
      method: "POST",
      body: JSON.stringify({ code, input, mode }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const { output } = await res.json();
      this.setState({ output });
    }
  };

  setMode = (e) => {
    this.setState({
      mode: e.target.value,
      code: e.target.value === "python" ? snippetp : snippetc,
    });
  };
  clear = () => {
    this.setState({
      code: this.state.mode === "python" ? snippetp : snippetc,
      input: "",
      output: "",
    });
  };
  handleCodeChange = (code) => this.setState({ code });
  handleInputChange = (input) => this.setState({ input });

  render() {
    const { code, input, output } = this.state;

    return (
      <div className="container">
        <div className="head">
          Online {this.state.mode === "python" ? this.state.mode : "C++"} IDE
        </div>
        <div className="lang">
          <select name="mode" onChange={this.setMode} value={this.state.mode}>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
        <div className="type">Type your code here:</div>
        <div className="input">Inputs</div>
        <div className="input_val">
          <textarea
            onChange={(e) => this.handleInputChange(e.target.value)}
            value={input}
          ></textarea>
        </div>
        <div className="output">Outputs</div>
        <div className="output_val">
          {output.split("\n").map((part, index) => (
            <p key={index}>{part}</p>
          ))}
        </div>
        <div className="run" onClick={this.submit}>
          <button>Build and Run</button>
        </div>
        <div className="clear">
          <button onClick={this.clear}>Clear</button>
        </div>

        <div className="editor">
          <AceEditor
            className="coder"
            value={code}
            placeholder="Write code here!!"
            theme="monokai"
            mode={this.state.mode}
            height="100%"
            width="100%"
            showPrintMargin={false}
            showGutter={true}
            highlightActiveLine={true}
            fontSize={14}
            ref={(editor) => (this.editor = editor)}
            editorProps={{ $blockScrolling: true }}
            tabSize={3}
            onChange={this.handleCodeChange}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableAutoIndent: true,
              enableSnippets: true,
              showLineNumbers: true,
            }}
          />
        </div>
      </div>
    );
  }
}

export default Main;
