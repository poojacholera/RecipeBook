import React, {useEffect, useState} from 'react';
import './CSS/App.css';
import Navmenu from './navmenu';
import RecipeView from "./RecipeView";
import { Switch } from "react-router-dom";
import CoronaInfo from './CoronaInfo';
import { Route } from 'react-router';
import Home from "./home";
import FruitsAndVeg from "./FruitsAndVeg";
import ZoomVideoChat from "./ZoomVideoChat";
import JitsiMeetComponent from "./JitsiMeetComponent";
import WhereByComponent from "./WhereByComponent";

const App = () => {
    return (
        <div className='App'>
            <header>
                <Navmenu/>
            </header>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/Recipes' component={RecipeView}/>
                    <Route path='/CoronaInfo' component={CoronaInfo}/>
                    <Route path='/VideoChat' component={JitsiMeetComponent}/>
                    {/*<Route path='/WhereByVideoChat' component={WhereByComponent}/>*/}
                    {/*<Route path='/ZoomVideoChat' component={ZoomVideoChat}/>*/}
                    <Route path='/FruitsAndVeg' component={FruitsAndVeg}/>

                </Switch>
        </div>
    );
};
export default App;
