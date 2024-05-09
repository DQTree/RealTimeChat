import styles from './member.module.css'

export default function Member({name, status, icon}: {name: string; status: boolean, icon: string}) {
    return (
        <div className={styles.member}>
            <div className={styles.memberIcon}>
                {icon ? <img src={icon} /> : name[0]}
            </div>
            <div className={styles.memberName}>
                {name}
            </div>
        </div>
    )
}
