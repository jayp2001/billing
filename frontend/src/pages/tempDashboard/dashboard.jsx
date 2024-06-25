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
                    navigate('/main/Delivery')
                }}>
                    Delivery
                </div>
                <div className='dashboardCard'
                    onClick={() => {
                        navigate('/main/Pick Up')
                    }}>
                    Pick Up
                </div>
                <div className='dashboardCard'
                    onClick={() => {
                        navigate('/main/Hotel')
                    }}>
                    Hotel
                </div>
            </div>
        </div>
    )
}

export default Dashboard;