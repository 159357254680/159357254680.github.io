import PropTypes from 'prop-types'

function DataTable({ ratings, musics, accuracies,color }){

    function getStyles(color) {
        return {
            table: {
                position: 'absolute',
                left: '5%',
                top: '27.5%',
                width: '85%',
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
            console.error("Invalid data passed to GetData:")
            return (
                <>
                    <td style={styles.thTd}>暂无数据</td>
                    <td style={styles.thTd}>暂无数据</td>
                    <td style={styles.thTd}>暂无数据</td>
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
                        width:'15%'
                    }}>用时</th>
                    <th style={{
                        ...styles.thTd,
                        width:'30%'
                    }}>乐曲名称</th>
                    <th style={{
                        ...styles.thTd,
                        width:'30%'
                    }}>得分</th>
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

