import PropTypes from 'prop-types'

function DataTable({ ratings, musics, accuracies,color }){

    function getStyles(color) {
        return {
            table: {
                position: 'absolute',
                left: '4.4%',
                top: '27.5%',
                width: '92%',
                borderCollapse: 'collapse',
                fontSize: '16px',
                textAlign: 'left',
                border: `1px solid ${color}`,
            },
            thTd: {
                padding: '1rem',
                height: '3.57rem',
                textAlign: 'center',
                fontFamily: 'YouSheBiaoTiHei',
                fontSize: '32px',
                fontWeight: 'normal',
                lineHeight: 'normal',
                letterSpacing: '0em',
                color: `${color}`,
                border: `1px solid ${color}`,
            },
        };
    }

    const styles = getStyles(color);

    function GetData({ ratings,musics,accuracies}) {
        if (!Array.isArray(ratings) || !Array.isArray(musics) || !Array.isArray(accuracies) ) {
            console.error("Invalid data passed to GetData:");
            return (
                <>
                    <td>Error: Invalid data</td>
                    <td>Error: Invalid data</td>
                    <td>Error: Invalid data</td>
                </>
            )
        }

        return ratings.map((rating, index) => (
            <tr
                key={index}
            >
                <td style={{
                    ...styles.thTd,
                    fontSize:'38px',
                }}>
                        {rating}
                </td>

                <td style={{
                    ...styles.thTd,
                    fontSize:'38px',
                }}>
                    {musics[index]}
                </td>

                <td style={{
                    ...styles.thTd,
                    fontSize:'38px',
                }}>
                    {accuracies[index]}
                </td>
            </tr>
        ));

    
        
    }

    return (
        <table style={styles.table}>
            <thead>
                <tr>
                    <th style={{
                        ...styles.thTd,
                        width:'16.8%'
                    }}>评级</th>
                    <th style={{
                        ...styles.thTd,
                        width:'34.75%'
                    }}>乐曲名称</th>
                    <th style={{
                        ...styles.thTd,
                        width:'48.55%'
                    }}>历史最高准确率</th>
                </tr>
            </thead>
            <tbody>
                <GetData
                    ratings={ratings}
                    musics={musics}
                    accuracies={accuracies}
                />
            </tbody>
        </table>
    );
}

DataTable.propTypes = {
    ratings: PropTypes.array.isRequired,
    musics: PropTypes.array.isRequired,
    accuracies: PropTypes.array.isRequired,
    datas: PropTypes.array.isRequired,
    color: PropTypes.array.isRequired,
};

export default DataTable

