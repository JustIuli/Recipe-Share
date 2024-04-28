import '../assets/css/loading.css'
import {Text} from "@mantine/core";

const Loading = () => {
    return (
        <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div className="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <Text size='lg' fw={800} style={{textAlign:'center'}}>Loading...</Text>
            </div>
        </div>
    );
};

export default Loading;