import {render} from 'preact';
import {useState, useEffect} from "preact/hooks";
import './style.css';
import {Home} from './pages/home';
import {OpenProjectModal} from "./components/openProjetcModal";
import {CreateProjectModal} from "./components/createProjectModal";
import type {Project} from "./components/openProjetcModal";
import AppContext from "./AppContext";
import {LoadingScreen} from "./components/LoadingScreen";

export function App() {
    const [isOpenProjectModalOpen, setIsOpenProjectModalOpen] = useState<boolean>(true);
    const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState<boolean>(false);

    const [backendURL, setBackendURL] = useState<string | null>(null);
    const [wsURL, setWsURL] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isGlobalLoading, setIsGlobalLoading] = useState<boolean>(false);

    useEffect(() => {
        fetch('/backend.txt')
            .then(res => res.text())
            .then(url => {
                let [backend, ws] = url.trim().split('\n');
                setBackendURL(backend.trim());
                setWsURL(ws.trim());
                setIsLoading(false);
            })
            .catch(err => console.error("Failed to load backend URL:", err));
    }, []);

    const handleProjectSelect = (project: Project) => {
        console.log('Selected project:', project);
        setIsOpenProjectModalOpen(false);
    };

    const handleBackToOpenPrjModal = () => {
        setIsCreateProjectModalOpen(false)
        setIsOpenProjectModalOpen(true);
    }

    const handleNewProject = () => {
        setIsOpenProjectModalOpen(false);
        setIsCreateProjectModalOpen(true);
    }

    const handleCreateProject = (data: { name: string, description: string }) => {
        console.log('Create project:', data);
        setIsCreateProjectModalOpen(false);
    }

    return (
        <AppContext.Provider value={{setIsGlobalLoading, backendURL, wsURL}}>
            {isLoading ? (
                <LoadingScreen/>
            ) : (
                <>
                    {isGlobalLoading && <LoadingScreen/>}
                    <Home/>
                    <OpenProjectModal
                        isOpen={isOpenProjectModalOpen}
                        onSelect={handleProjectSelect}
                        onNewProject={handleNewProject}
                    />
                    <CreateProjectModal
                        isOpen={isCreateProjectModalOpen}
                        onBack={handleBackToOpenPrjModal}
                        onCreate={handleCreateProject}
                    />
                </>
            )}
        </AppContext.Provider>
    );
}

render(<App/>, document.getElementById('app')!);