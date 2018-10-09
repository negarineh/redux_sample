import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import { store } from '../src/_helpers';
import { Provider } from 'react-redux';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter()});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><App /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
