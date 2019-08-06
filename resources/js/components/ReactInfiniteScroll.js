import React from 'react';
import ReactDOM from 'react-dom';
import PostContent from './PostContent';
import PostLoader from './PostLoader';
import Axios from 'axios';

class ReactInfiniteScroll extends React.Component{
    constructor(props){
        super(props);

        this.state={
            posts:[],
            progress:false,
            completed:false,
        };
        this.infiniteScroll = this.infiniteScroll.bind(this);
    }

    componentDidMount(){
        this.getInitialState();
        window.addEventListener('scroll',this.infiniteScroll);
    }
    getInitialState(){
        this.setState(()=>({
            progress:true,
        }));
        axios.post("/demos/react-infinite-scroll",{
            'offset':this.state.posts.length
        }).then((response)=>{
            this.setState(()=>({
                posts:response.data,
                progress:false,
                completed:response.data.length?false:true
            }));
        }).catch((error)=>{
            console.log(error);
        });
    }
    infiniteScroll(){
        if(!this.state.completed && !this.state.progress){
            this.setState(()=>({
                progress:true,
            }));

            axios.post("/demos/react-infinite-scroll",{
                'offset':this.state.posts.length
            }).then((response)=>{
                this.setState((prevState)=>({
                    posts:prevState.posts.concat(response.data),
                    progress:false,
                    completed:response.data.length?false:true
                }));
            }).catch((error)=>{
                console.log(error);
            });
        }
    }
    render(){
        const Post = this.state.posts.map((post)=>(
            <PostContent key={post.id} post={post}/>
        ));

        return (
            <div>
                {Post.length >0 && Post}
                <PostLoader progress={this.state.progress} completed={this.state.completed}/>
            </div>
        )
    }
}

if(document.getElementById('react-infinite-scroll')){
    ReactDOM.render(<ReactInfiniteScroll />, document.getElementById('react-infinite-scroll'));
}