import { StyleSheet, Font } from '@react-pdf/renderer'
import myFont from '../../fonts/Roboto Việt Hóa/Roboto-Regular.ttf'
Font.register({ family: 'Roboto', src: myFont })
const styles = StyleSheet.create({
  container: {
    marginLeft: '40px',
  },
  title: {
    paddingTop: '50px',
    paddingBottom: '20px',
    fontSize: '20px',
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  titleHD: {
    paddingTop: '20px',
    fontSize: '20px',
    fontFamily: 'Roboto',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  titleTB: {
    fontSize: '15px',
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    paddingBottom: '10px',
  },
  text: {
    fontSize: '13px',
    fontFamily: 'Roboto',
    textAlign: 'center',
  },
  textMaHD: {
    fontSize: '13px',
    fontFamily: 'Roboto',
    textAlign: 'center',
    paddingBottom: '20px',
  },
  textThuocTinh: {
    fontSize: '10px',
    fontFamily: 'Roboto',
    marginBottom: '3px',
    marginTop: '3px',
  },
  table: {
    width: '100%',
    marginLeft: '40px',
    marginRight: '40px',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    borderTop: '1px solid #EEE',
    marginRight: '40px',
  },
  header: {
    borderTop: 'none',
  },
  bold: {
    fontWeight: 'bold',
  },
  // So Declarative and unDRY 👌
  row1: {
    width: '10%',
    paddingTop: '10px',
    paddingBottom: '10px',
    fontSize: '10px',
    borderLeft: '1px solid black',
    borderTop: '1px solid black',
    borderBottom: '1px solid black',
    paddingLeft: '5px',
    fontFamily: 'Roboto',
  },
  row2: {
    width: '25%',
    fontSize: '10px',
    paddingTop: '10px',
    paddingBottom: '10px',
    borderLeft: '1px solid black',
    borderTop: '1px solid black',
    borderBottom: '1px solid black',
    paddingLeft: '5px',
    fontFamily: 'Roboto',
  },
  row3: {
    width: '20%',
    fontSize: '10px',
    paddingTop: '10px',
    paddingBottom: '10px',
    borderLeft: '1px solid black',
    borderTop: '1px solid black',
    borderBottom: '1px solid black',
    paddingLeft: '5px',
    fontFamily: 'Roboto',
  },
  row4: {
    width: '20%',
    fontSize: '10px',
    paddingTop: '10px',
    paddingBottom: '10px',
    borderLeft: '1px solid black',
    borderTop: '1px solid black',
    borderBottom: '1px solid black',
    paddingLeft: '5px',
    fontFamily: 'Roboto',
  },
  row5: {
    width: '20%',
    fontSize: '10px',
    paddingTop: '10px',
    paddingBottom: '10px',
    border: '1px solid black',
    paddingLeft: '5px',
    fontFamily: 'Roboto',
  },
  colorBlock: {
    width: 30,
    height: 30,
    borderRadius: 10,
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  textLeft: {
    fontFamily: 'Roboto',
    fontSize: '13px',
    marginLeft: '40px',
  },
  textRight: {
    fontFamily: 'Roboto',
    fontSize: '15px',
    marginRight: '30px',
  },
  button: {
    color: 'white',
    textDecoration: 'none',
  },
})

export { styles }
