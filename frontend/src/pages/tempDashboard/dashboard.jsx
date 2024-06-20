import './dashboard.css';
import Header from '../../components/Header/Header';
import { useNavigate } from "react-router-dom";
function Dashboard() {
    const navigate = useNavigate();
    return (
        <div>
            <Header />
            <div className='flex justify-end gap-8 pl-6 pr-6 pt-6'>
                <div className='dashboardCard' onClick={() => {
                    navigate('/main/tab2')
                }}>
                    Delivery
                </div>
                <div className='dashboardCard'
                    onClick={() => {
                        navigate('/main/tab3')
                    }}>
                    Pick Up
                </div>
            </div>
        </div>
    )
}

export default Dashboard;