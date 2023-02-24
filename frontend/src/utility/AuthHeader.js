export default function AuthHeader(){
    const accessToken=localStorage.getItem('accessToken');
    if(accessToken){
        return {'x-access-token':accessToken}
    }else{
        console.log('token bulunmamaktadır');
    }
}