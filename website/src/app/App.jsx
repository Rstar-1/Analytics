import { BrowserRouter } from 'react-router-dom'
import AppRoutes from '../routes/index'
import ScrollToTop from '../components/common/generic/ScrollToTop'
import Cursor from '../components/common/animation/Cursor'

const App = () => {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Cursor />
            <AppRoutes />
        </BrowserRouter>
    )
}

export default App

