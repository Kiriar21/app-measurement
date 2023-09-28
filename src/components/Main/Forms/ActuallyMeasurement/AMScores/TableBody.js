import Table from '../../../../Tables/Table/Table'
import Thead from '../../../../Tables/Thead/Thead'
import THeader from '../../../../Tables/THeader/THeader'
import Tbody from '../../../../Tables/Tbody/Tbody'
import TDate from '../../../../Tables/TDate/TDate'

export default function TableBody(props){
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
                    {props.tbody.map( (e) => {
                      return (
                        <tr key={e.id}>
                            <TDate>{e.placeOpen}</TDate>
                            <TDate>{e.placeCat}</TDate>
                            <TDate>{e.placeSex}</TDate>
                            <TDate>{e.id}</TDate>
                            <TDate>{e.competitor}</TDate>
                            <TDate>{e.sex}</TDate>
                            <TDate>{e.class}</TDate>
                            <TDate>{e.cat}</TDate>
                            <TDate>{e.club}</TDate>
                            <TDate>{e.city}</TDate>
                            <TDate>{e.scores}</TDate>
                            <TDate>{e.timeStart}</TDate>
                            <TDate>{e.timeMeta}</TDate>
                            <TDate>{e.distance}</TDate>
                            <TDate>{e.avgPace}</TDate>
                        </tr>
                      )
                    })}
            </Tbody>
        </Table>
    )
}

