import Table from '../../../../Tables/Table/Table'
import Thead from '../../../../Tables/Thead/Thead'
import THeader from '../../../../Tables/THeader/THeader'
import Tbody from '../../../../Tables/Tbody/Tbody'
import TDate from '../../../../Tables/TDate/TDate'

export default function TableBody(props){
    if (!props.tbody || props.tbody.length === 0) {
        return <h1>Brak danych do wyświetlenia.</h1>;
    }
    if (props.tbody[0].data) {
        return (
            <>
                {props.tbody.map((group, index) => (
                    <div key={index}>
                        <h3>{group.group}</h3>
                        <Table>
                            <Thead>
                                <tr>
                                    {props.theader.map((th) => (
                                        <THeader key={th} title={th} />
                                    ))}
                                </tr>
                            </Thead>
                            <Tbody>
                                {group.data.map((row, idx) => (
                                    <tr key={idx}>
                                        {props.theader.map((header) => (
                                            <TDate key={header}>{row[header]}</TDate>
                                        ))}
                                    </tr>
                                ))}
                            </Tbody>
                        </Table>
                    </div>
                ))}
            </>
        );
    } else {
        return (
            <Table>
                <Thead>
                    <tr>
                        {props.theader.map((th) => (
                            <THeader key={th} title={th} />
                        ))}
                    </tr>
                </Thead>
                <Tbody>
                    {props.tbody.map((row, idx) => (
                        <tr key={idx}>
                            {props.theader.map((header) => (
                                <TDate key={header}>{row[header]}</TDate>
                            ))}
                        </tr>
                    ))}
                </Tbody>
            </Table>
        );
    }
}

