import classNames from 'classnames/bind';
import { Container } from 'react-bootstrap';

import styles from './App.scss';
import Header from './components/Header'
import TableUsers from './components/TableUsers';

const cx = classNames.bind(styles)

function App() {
  return (
    <div className={cx('app-container')}>
      <Header />
      <Container>
        <TableUsers />
      </Container>
    </div>
  );
}

export default App;
