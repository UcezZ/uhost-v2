import Enumerable from "linq";
import { useContext, useState } from "react";
import StateContext from "../../context/StateContext";
import ApiService from "../../services/ApiService";
import ErrorCard from "./ErrorCard";
import VideoUploadProgressCard from "./VideoUploadProgressCard";
import VideoUploadSuccessCard from "./VideoUploadSuccessCard";

export default function VideoUploadCard({ onClose }) {
    const { token, locale } = useContext(StateContext);
    const [view, setView] = useState(
        <div className="card">
            <div className="card-header">{locale.getValue('page.upload')}
                <button onClick={onClose} className="floating-modal-caller close">
                    <span></span>
                    <span></span>
                </button>
            </div>
            <form onSubmit={onSubmit} encType="multipart/form-data">
                <input type="hidden" name="max_file_size" value="2147483647" />
                <table className="card-body">
                    <tr>
                        <td>{locale.getValue('common.file')}</td>
                        <td><input name="file" type="file" accept="video/mp4" defaultValue="" required onChange={setFileName} /></td>
                    </tr>
                    <tr>
                        <td style={{ whiteSpace: 'inherit' }}>{locale.getValue('video.ispublic')}</td>
                        <td className="toggle-wrapper">
                            <input id="checkboxIsPublic" name="ispublic" type="checkbox" />
                            <label htmlFor="checkboxIsPublic">
                                <span></span>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td>{locale.getValue('common.caption')}</td>
                        <td><input type="text" name="name" required minLength="2" maxLength="255" defaultValue="" /></td>
                    </tr>
                </table>
                <div className="submit-wrapper">
                    <button type="submit">{locale.getValue('upload.submit')}</button>
                </div>
            </form>
        </div>
    );

    function onSubmit(e) {
        e.preventDefault && e.preventDefault();

        ApiService.uploadVideo(
            token,
            e.target,
            e => setView(<VideoUploadSuccessCard video={e} onClose={onClose} />),
            e => setView(<ErrorCard error={e} onSubmit={onClose} />),
            e => setView(<VideoUploadProgressCard progress={e.progress} />));
    }

    function setFileName(e) {
        console.log(e.target.form);

        let nameElement = Enumerable
            .from(e.target.form)
            .firstOrDefault(e => e instanceof HTMLInputElement && e.name === 'name');

        if (nameElement && e.target.files[0].name) {
            let name = e.target.files[0].name;
            nameElement.value = name.substring(0, name.lastIndexOf('.'));
        }
    }

    return view;
}