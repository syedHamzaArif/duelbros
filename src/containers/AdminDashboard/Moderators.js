import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import DashboardOutline from './DashboardOutline';
import DataTable from "./DataTable"
import { Service } from '../../config/service';
import { getToken } from '../../utils';

const Moderators = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const columns = ["Username", "Email", "Coins", "Total Match Count"]

    const getModerators = async () => {
        setLoading(true);
        try {
            const result = await Service.getModerators(getToken())
            setData(result.data)
        } catch (error) {
            // alert(error)
            console.log('Inside Catch => ', error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        getModerators()
    }, [])

    return (
        <DashboardOutline ChildComponent={() => {return loading ? <div style={{textAlign: "center"}}><CircularProgress /></div> : <DataTable data={data} columns={columns} role="moderator"/>}} />
    )
}

export default Moderators