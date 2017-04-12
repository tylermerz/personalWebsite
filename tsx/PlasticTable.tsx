import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ReactTable from 'react-table';
import 'whatwg-fetch';

export class PlasticTable extends React.Component<any, any> {

    state: Object;

    constructor(props: Object) {
        super(props);
        this.state = {
            data:[]
        };
        this.loadFirst= this.loadFirst.bind(this);
        this.loadFirst();
    };
    
    loadFirst(){
        let data = [];
        let link = {};
        fetch("https://api.github.com/repos/tylermerz/"+this.props["repo"]+"/events", { method: "GET" }).then(response => { 
            link = JSON.stringify(response.headers.get("Link"));
            return response.json();
        }).then(response => {
            response.forEach(e => {
                if (e["type"] === "PushEvent") {
                    e["payload"]["commits"].forEach(com => {
                        data.push({date:new Date(e["created_at"]).toString().slice(0,24), commitHash: <a href={com["url"].replace("api.","").replace("/repos","").replace("commits","commit")}>{com["sha"].substring(0,8)}</a>, message: com["message"], });
                    });
                }
            });
            this.setState({ data: this.state["data"].concat(data) });
        });

    }

    render() {
        const cols=[{header:"Commit",accessor:"commitHash",maxWidth:100},{header:"Date",accessor:"date"},{header:"Message",accessor:"message"}]
        return (
            <ReactTable
                data={this.state["data"]} 
                columns={cols}
                defaultPageSize={5}
            />
        );
    }
};

ReactDOM.render(
    <PlasticTable repo="packingProblems" />,
    document.getElementById('GUI'))
