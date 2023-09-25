import Table from '../../../Tables/Table/Table'
import Thead from '../../../Tables/Thead/Thead'
import THeader from '../../../Tables/THeader/THeader'
import Tbody from '../../../Tables/Tbody/Tbody'
import Tdate from '../../../Tables/TDate/TDate'

export default function TableBodyStatistic(props){
    return (
        <Table>
            <Thead>
                <tr>
                    {props.theader.map( (th) => {
                        return <THeader key={th} title={th} />
                    })}
                </tr>
            </Thead>
            <Tbody>
                {
                    props.tbody.map ( td => { 
                        return (
                            <tr key={td.name} >
                            {Object.values(td).map( (value, index) => {
                                return <Tdate key={index}>{value}</Tdate>
                            })}
                            </tr>
                        )
                    }
                )
                }
            </Tbody>
        </Table>
    )
}