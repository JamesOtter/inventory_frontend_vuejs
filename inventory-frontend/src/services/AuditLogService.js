import http from "../http-common";

class AuditLogService {
    getAuditLog(page = 0, size = 10) {
        return http.get("/admin/audit-logs", {
            params: {
                page: page,
                size: size
            }
        });
    }
}

export default new AuditLogService();