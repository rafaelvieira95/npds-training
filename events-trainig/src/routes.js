import {BrowserRouter, Switch, Route} from "react-router-dom";
import Header from './components/Header/Header';

import Home from './pages/Home/index';
import Event from './pages/Events/index';
import Programation from './pages/Programations/index';

export default function Routes(){

    return(
        <>
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route path="/home"  component={Home} />
                <Route path="/events"  component={Event}/>
                <Route path="/programations/:id"  component={Programation}/>
            </Switch>
           
        </BrowserRouter>
         </>
    );
}

