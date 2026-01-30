import http from "../http-common";

class AuditLogService {
    getAuditLog() {
        return http.get("/admin/audit-logs");
    }
}

export default new AuditLogService();