import { useState, useEffect } from 'react';
import ava from '/src/assets/ava-photos/ava-profile.png';
import hidePass from '/src/assets/form/mdi_eye-off.png';
import showPass from '/src/assets/form/mdi_eye-on.png';
import { useNavigate } from 'react-router-dom';
import { useUserCrud } from '/src/hooks/useUserCrud';

const FormProfile = () => {
    const { listUsers, fetchUsers, updateUser, deleteUser } = useUserCrud();
    const navigate = useNavigate();
    const [profile, setProfile] = useState({}); 
    const [tempProfile, setTempProfile] = useState({}); 
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);

    useEffect(() => {
        fetchUsers();
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setProfile(parsedUser);
            setTempProfile(parsedUser); 
        }
    }, []);


    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleRePasswordVisibility = () => setShowRePassword(!showRePassword);


    const handleInputChange = (res) => {
        const { name, value } = res.target;
        setTempProfile({ ...tempProfile, [name]: value });
    };


    const handleSave = () => {
        setProfile(tempProfile); 
        localStorage.setItem('user', JSON.stringify(tempProfile));
        updateUser(profile.id, tempProfile);

        console.log(listUsers)
    };


    const handleDelete = () => {
        deleteUser(profile.id);
        navigate('/login');
    };


    return (
        <div className='flex flex-col w-full border rounded-[10px] p-6 gap-6'>
            <div className='flex w-full hp:gap-[14px] lg:gap-4'>
                <div className='w-[92px] h-[92px] rounded bg-slate-400'>
                    <img src={ava} alt="ava-profile" />
                </div>
                <div className='flex flex-col w-full lg:gap-4'>
                    <h5>{profile.name}</h5>
                    <p className='text-banner text-black'>{profile.email}</p>
                    <p className='text-button text-orange-600 cursor-pointer'>Ganti Foto Profil</p>
                </div>
            </div>
            <div className='flex w-full hp:flex-col lg:flex-row hp:gap-4 lg:gap-4'>
                <div>
                    <label htmlFor="fullname" className="text-input">Nama Lengkap</label>
                    <input 
                        type="text" 
                        name="name" 
                        className="input-form"
                        id="fullname"
                        value={tempProfile.name || ""} 
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="email" className="text-input">E-Mail</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        className='input-form'
                        value={tempProfile.email || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='hp:block md:hidden lg:hidden'>
                    <label htmlFor="sex" className="text-input">Jenis Kelamin</label>
                    <select 
                        className='w-full input-form appearance-none xl:h-[48px] hp:h-[34px] px-[10px] py-1 border rounded-md'
                        name="sex" 
                        id="sex"
                        value={tempProfile.sex || ""}
                        onChange={handleInputChange}
                    >
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="phone" className="text-input ml-[80px]">No.Hp</label>
                    <div className="flex gap-6">
                        <select 
                            name="country" 
                            id="country"
                            value={tempProfile.phone?.negara || ""}
                            onChange={handleInputChange}
                        >
                            <option value="+62">+62</option>
                            <option value="+65">+65</option>
                            <option value="+60">+60</option>
                        </select>
                        <input 
                            type="tel" 
                            name="phone" 
                            className='input-form' 
                            id="phone"
                            value={tempProfile.phone?.nomor || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className='relative hp:block md:hidden lg:hidden'>
                    <label htmlFor="password" className="text-input">Kata Sandi</label>
                    <input 
                        type={showPassword ? "text" : "password"} 
                        name="password" 
                        id="password" 
                        className="input-form pr-10"
                        value={tempProfile.password || ""}
                        onChange={handleInputChange}
                    />
                    <img 
                        src={showPassword ? showPass : hidePass}
                        alt={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-3 hp:top-7 lg:top-9 cursor-pointer"
                        onClick={togglePasswordVisibility} 
                    />
                </div>
                <div className="relative hp:block md:hidden lg:hidden">
                    <label htmlFor="confirm_password" className="text-input">Konfirmasi Kata Sandi</label>
                    <input 
                        type={showRePassword ? "text" : "password"} 
                        name="confirm_password" 
                        id="confirm_password" 
                        className="input-form pr-10"
                        value={tempProfile.password || ""}
                        onChange={handleInputChange}
                    />
                    <img 
                        src={showRePassword ? showPass : hidePass}
                        alt={showRePassword ? "Hide confirm password" : "Show confirm password"}
                        className="absolute right-3 hp:top-7 lg:top-9 cursor-pointer"
                        onClick={toggleRePasswordVisibility} 
                    />
                </div>
            </div>
            <div className='flex hp:flex-col xl:flex-row hp:gap-4 xl:gap-40'>
                <div className='w-full flex justify-end hp:flex-col xl:flex-row gap-4'>
                    <button type='submit' 
                    className="btn-login"
                    onClick={handleSave}>
                    Simpan</button>                
                    <button type='button' 
                    className="btn-login bg-red-500 hover:bg-red-700 hp:hidden xl:block"
                    onClick={handleDelete}>
                    Hapus</button>
                </div>
            </div>
        </div>
    );
};

export default FormProfile;
